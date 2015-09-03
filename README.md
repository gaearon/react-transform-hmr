# react-transform-webpack-hmr

A [React Transform](https://github.com/gaearon/babel-plugin-react-transform) equivalent to [React Hot Loader](https://github.com/gaearon/react-hot-loader).

## Installation

First, install the [Babel plugin](https://raw.githubusercontent.com/gaearon/babel-plugin-react-transform):

```
npm install --save-dev babel-plugin-react-transform
```

Then, install the transform:

```
npm install --save-dev react-transform-webpack-hmr
```

Then edit your `.babelrc` to include `extra.babel-plugin-react-transform`.  
It must be an array of the transforms you want to use:

```js
{
  "stage": 0,
  "plugins": [
    "react-transform"
  ],
  "extra": {
    // must be defined and be an array
    "react-transform": [{
      "target": "react-transform-webpack-hmr",
      // if you use React Native, pass "react-native" instead:
      "imports": ["react"],
      // this is important for Webpack HMR:
      "locals": ["module"]
    }]
    // note: you can put more transforms into array
    // this is just one of them!
  }
}
```

Finally, make sure you process files with `babel-loader`, and that you *don’t* use React Hot Loader (it’s not needed with this transform).

This transform has no effect when `process.env.NODE_ENV` is set to `'production'`.

## License

MIT
