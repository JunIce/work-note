const webpack = require("webpack")

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js",
    },
    output: {
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            lib: {
                name: 'vendors',
                chunks: 'all',
            }
          },
        },
      },
}