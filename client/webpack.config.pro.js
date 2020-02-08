/***********************
 * @name webpack 生产配置文件
 * @author Jo.gel
 * @date 2020/1/21 0021
 ***********************/
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');                // vue-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// css
const HtmlWebpackPlugin = require('html-webpack-plugin');       // 生成index.html 到dist 目录
const CopyWebpackPlugin = require('copy-webpack-plugin');       // copy 文件
const {CleanWebpackPlugin} =require('clean-webpack-plugin');      // 清空dist目录
module.exports = (env = {}) => ({
	mode: env.prod ? 'production' : 'development',
	// devtool: env.prod ? false : 'source-map',
	// devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
	entry: path.resolve(__dirname, './src/main.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
	},
	resolve: {
		alias: {
			// is a simple `export * from '@vue/runtime-dom`. However having this
			// extra re-export somehow causes webpack to always invalidate the module
			// on the first HMR update and causes the page to reload.
			'vue': '@vue/runtime-dom'
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
			{
				test: /\.png$/,
				exclude: /^node_modules$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name:"/assets/img/[name]-[hash:8].[ext]"
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {hmr: !env.prod}
					},
					'css-loader'
				]
			},
			// 增加scss
			{
				test: /\.(scss)$/,
				use: ['vue-style-loader','css-loader','sass-loader'],
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		// 生成index.html
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: __dirname+"/public/index.html",
			chunks: ["app"],
			minify: {
				collapseWhitespace: true
			}
		}),
		new CopyWebpackPlugin([
			// copy lib
			{
				from: __dirname + '/src/chartLib',
				to: __dirname + '/dist/chartLib',
			},
			// 后续向对外暴露API文件
			{
				from: __dirname + '/public',
				to: __dirname + '/dist',
			},
			// {
			// 	from: __dirname + '/public/screen.png',
			// 	to: __dirname + '/dist/screen.png',
			// },
			// {
			// 	from: __dirname + '/public/favicon.icon',
			// 	to: __dirname + '/dist/favicon.icon',
			// }
		])
	],
	devServer: {
		inline: true,
		hot: true,
		stats: 'minimal',
		contentBase: __dirname,
		overlay: true
	}
});
