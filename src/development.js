import { getForceUpdate, createProxy } from 'react-proxy';

let componentProxies = {};
if (typeof window !== 'undefined') {
  componentProxies = window.__reactComponentProxies || {};
  Object.defineProperty(window, '__reactComponentProxies', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: componentProxies
  });
}

export default function proxyReactComponents({ filename, components, imports, locals }) {
  const [React] = imports;
  const [{ hot }] = locals;

  if (!React.Component) {
    throw new Error('imports[0] for react-transform-webpack-hmr does not look like React.');
  }
  if (!hot) {
    return ReactClass => ReactClass;
  }

  if (Object.keys(components).some(key => !components[key].isInFunction)) {
    hot.accept();
  }

  const forceUpdate = getForceUpdate(React);

  return function wrapWithProxy(ReactClass, uniqueId) {
    const { isInFunction = false } = components[uniqueId];
    if (isInFunction) {
      return ReactClass;
    }

    const globalUniqueId = filename + '$' + uniqueId;
    if (componentProxies[globalUniqueId]) {
      console.info('[React HMR] Patching ' + uniqueId);
      const instances = componentProxies[globalUniqueId].update(ReactClass);
      setTimeout(() => instances.forEach(forceUpdate));
    } else {
      componentProxies[globalUniqueId] = createProxy(ReactClass);
    }

    return componentProxies[globalUniqueId].get();
  };
}
