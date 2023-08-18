const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
  // Load environment variables from .env.local file
  dotenv.config({ path: ".env.local" });

  return {
    mode: "development",
    entry: "./src/script.ts", // entry file
    output: {
      filename: "script.js", // output file
      path: path.resolve(__dirname, "public"),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
          },
        },
      ],
    },
    devServer: {
      static: path.join(__dirname, "public"),
      compress: true,
      port: 5520,
    },
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "@services": path.resolve(__dirname, "src/services"),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
      }),
    ],
    devtool: "inline-source-map",
  };
};
