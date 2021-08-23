const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

function assetsPath (_path) {
  const assetsSubDirectory = 'static';

  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, './'),
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        },
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'index.html',
      title: 'Vue demo'
    })
  ]
};
