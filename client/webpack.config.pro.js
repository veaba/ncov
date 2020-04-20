/***********************
 * @name webpack 生产配置文件
 * @author Jo.gel
 * @date 2020/1/21 0021
 ***********************/
const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');                // vue-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// css
const HtmlWebpackPlugin = require('html-webpack-plugin');       // 生成index.html 到dist 目录
const CopyWebpackPlugin = require('copy-webpack-plugin');       // copy 文件
const TerserPlugin = require('terser-webpack-plugin');          // 移除注释
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');   // 清空dist目录
module.exports = (env = {}) => ({
	mode: 'production',
	// devtool: env.prod ? false : 'source-map',
	// devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
	entry: path.resolve(__dirname, './src/main.ts'),
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: 'bundle.js',
		chunkFilename: "[id].chunk.js",
	},
	resolve: {
		alias: {
			// is a simple `export * from '@vue/runtime-dom`. However having this
			// extra re-export somehow causes webpack to always invalidate the module
			// on the first HMR update and causes the page to reload.
			'vue': '@vue/runtime-dom'
		},
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', 'd.ts', '.tsx', '.js', '.vue'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.vue$/,
				exclude: /^node_modules$/,
				use: 'vue-loader',
			},
			{
				test: /\.png$/,
				exclude: /^node_modules$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: "/assets/img/[name]-[hash:8].[ext]"
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /^node_modules$/,
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
				use: ['vue-style-loader', 'css-loader', 'sass-loader'],
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
			template: __dirname + "/public/index.html",
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
		]),
	],
	devServer: {
		inline: true,
		hot: true,
		stats: 'minimal',
		contentBase: "dist",
		overlay: true
	}
});
