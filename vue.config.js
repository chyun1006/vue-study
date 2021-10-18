const HappyPack = require('happypack')

module.exports = {
  //   chainWebpack: (config) => {
  //     config.module.rule('js').use('happypack/loader?id=happyBabel')
  //   },
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory',
          exclude: /node_modules/,
          include: /src/,
        },
      ],
    },
    plugins: [
      // new HappyPack({
      //   id: 'happyBabel',
      //   loaders: ['babel-loader'],
      // }),
    ],
    optimization: {
      runtimeChunk: 'single',
    },
  },
}
