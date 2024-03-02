const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// path.dirname(path)：返回路径中的目录名。
// path.basename(path)：返回路径中的文件名。
// path.join(path1[, path2[, ...]])：将路径片段合并为一个路径。
// path.resolve([from ...to])：解析相对路径到绝对路径。
// path.isAbsolute(path)：判断路径是否为绝对路径。

module.exports = {
  // 入口文件，因其位置属性分开打包
  // html插入名: 路径地址
  entry: {
    index: './src/index.js',
    swiper2: './src/js/swiper/swiperCol2.js',
    swiper3: './src/js/swiper/swiperCol3.js',
    swiper4: './src/js/swiper/swiperMs.js',
    fontColorful: './src/font/font-colorful/fontColorful.js'
  },
  // 输出
  output: {
    path: path.resolve(path.dirname(__dirname), 'dist'), // 当前文件所在目录衔接dist __filename，绝对路径。
    filename: './js/[name].js',// 'bundle.js',
    publicPath: './',
  },
  plugins: [
    new CleanWebpackPlugin(), // 清空旧版的包，防止重命名数字后缀
    new HtmlWebpackPlugin({
      template: "./index.ejs",
      chunks: ["index", "fontColorful"],
      inject: "head",
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,//i忽略大小写
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      // 从右向左加载。
      {
        test: /\.(png|jpe?g|gif|webp|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[hash:8].[ext]',
              outputPath: "img",
              esModule: false,
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: "font",
              esModule: false,
            }
          }
        ]
      },
      {
        test: /\.js$/i,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }]
      }
    ]
  },
};
