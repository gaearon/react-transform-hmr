# react-transform-hmr

A React Transform that enables hot reloading React classes using Hot Module Replacement API.

Hot module replacement is [supported natively by Webpack](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html) and available in Browserify with [browserify-hmr](https://github.com/AgentME/browserify-hmr).

## Installation

First, install the [Babel plugin](https://github.com/gaearon/babel-plugin-react-transform):

```
npm install --save-dev babel-plugin-react-transform
```

Then, install the transform:

```
npm install --save-dev react-transform-hmr
```

Then edit your `.babelrc` to include `extra.babel-plugin-react-transform`.  
It must be an array of the transforms you want to use:

```js
{
  "stage": 0,
  "env": {
    // only enable it when process.env.NODE_ENV is not 'production'
    "development": {
      "plugins": ["react-transform"],
      "extra": {
        // must be defined and be an array
        "react-transform": [{
          "target": "react-transform-hmr",
          // if you use React Native, pass "react-native" instead:
          "imports": ["react"],
          // this is important for Webpack HMR:
          "locals": ["module"]
        }]
        // note: you can put more transforms into array
        // this is just one of them!
      }
    }
  }
}
```

Finally, make sure you process files with `babel-loader`, and that you *don’t* use React Hot Loader (it’s not needed with this transform).

It is up to you to ensure that the transform is not enabled when you compile the app in production mode. The easiest way to do this is to put React Transform configuration inside `env.development` in `.babelrc` and ensure you’re calling `babel` with `NODE_ENV=production`. See [babelrc documentation](https://babeljs.io/docs/usage/babelrc/#env-option) for more details about using `env` option.

## License

MIT
