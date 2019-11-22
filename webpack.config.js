let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin')    //抽离CSS插件
module.exports = {
  devServer: {   //开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: './dist'
  },
  mode: 'development',   //模式，默认两种：production,development 
  entry: './src/index.js',   //入口
  output: {
    filename: 'bundle.js',   //打包后的文件名
    path: path.resolve(__dirname,'dist')   //路径必须是一个绝对路径
  },
  plugins: [   //数组，放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',    //原模板文件
      filename: 'index.html',    //打包后的模板文件
      minify: {
        removeAttributeQuotes: true, //删除属性的双引号，  
        collapseWhitespace: true,
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {   //模块
    rules: [    
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {   // 用babel-loader将es6转换为es5
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      //规则    css-loader  解析@import的语法
      //style-loader   将css文件插入到head的标签中
      //loader的特点是希望单一   即一个loader专门负责一个事情
      //loader的用法，字符串只用一个loader，多个loader时需要使用[]数组 
      //loader的顺序，默认从右向左执行 
      //loader还可以写成对象形式
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}