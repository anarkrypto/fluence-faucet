const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	resolve: {
		fallback: {
			net: false,
			tls: false,
			fs: false
		}
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		}),
		new NodePolyfillPlugin(),
		new CopyPlugin({
			patterns: [{ from: "./assets", to: "" }]
		})
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
			watch: true
		},
		watchFiles: ["src/**/*.html"],
		hot: true,
		port: 3000
	}
};
