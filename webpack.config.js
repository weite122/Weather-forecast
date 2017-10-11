const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: __dirname + '/app/index.js',
	output:{
		path: path.resolve(__dirname, 'dist'), //存放打包后文件的地方路径
		filename: 'bundle.js'  //打包后的文件名
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
	plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            allChunks: true
        }),
	  ],
    module: {
        //加载器配置
        rules: [
            { 
                test: /\.js$/, 
                loader: 'babel-loader'
            },
			{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["es2015"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:{
                        loader:'css-loader',
                        options: {
                           sourceMap: true
                        }
                    }
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:{
                        loader:'css-loader',
                        options: {
                           sourceMap: true
                        }
                    }
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader',{
                        loader:'sass-loader',
                        options: {
                           sourceMap: true
                        }
                    }]
                })
            },
		]
	},
	  
}

