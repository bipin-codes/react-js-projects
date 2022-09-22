const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        //find js and jsx files
        test: /\.(js|jsx)$/,
        //which files and folders to exclude
        exclude: /node_modules/,
        //loaders
        use: {
          //use babel loader for transpile
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      //tells which file to use to add our js and css tooo
      template: "./index.html",
    }),
  ],
};
