  
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const basePath = __dirname;

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";
  return {
    context: path.join(basePath, "src"),
    resolve: {
      extensions: [".js", ".ts", ".vue"],
      alias: {
        vue: "vue/dist/vue.runtime.esm.js",
      },
    },
    entry: {
      app: "./main.ts",
      vendor: ["vue", "vuetify", "vue-router"],
      vendorStyles: ["../node_modules/vuetify/dist/vuetify.min.css"],
    },
    output: {
      path: path.join(basePath, "dist"),
      filename: "[name].js",
    },
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /node_modules/,
    //          name: "vendor",
    //          chunks: "initial",
    //         enforce: true,
    //       },
    //     },
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: "vue-loader",
        },
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  indentedSyntax: true,
                },
              },
            },
          ],
        },
        
          {
            test: /\.(png|jpg)$/,
            type: "asset/resource",
          },
      ],
    },
    devtool: isDev ? "inline-source-map" : "none",
    devServer: {
      port:8085,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        hash: true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          extensions: {
            vue: true,
          },
          configFile: path.join(basePath, "./tsconfig.json"),
        },
      }),
      new VueLoaderPlugin(),
      isDev &&
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ].filter(Boolean),
  };
};




