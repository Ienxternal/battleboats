const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            },
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        ],
    },
    resolve: {
        fallback: {
            path: require.resolve("path-browserify"),
            os: require.resolve("os-browserify/browser"),
            crypto: require.resolve("crypto-browserify")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_GRAPHQL_SERVER': JSON.stringify(process.env.REACT_APP_GRAPHQL_SERVER),

        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
};
