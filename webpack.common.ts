// Types
import { type Configuration, ProvidePlugin } from "webpack";

// Node
import { resolve } from "path";

// Plugins
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import * as HTMLWebpackPlugin from "html-webpack-plugin";

export function root(path: string): string {
  return resolve(__dirname, path);
}

export function common(): Configuration {
  return {
    entry: {
      app: root("./source/index.ts"),
    },
    output: {
      publicPath: "/",
      filename: "[name].bundle.js",
      path: root("./bundled"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          use: "esbuild-loader",
          exclude: [/node_modules/i],
        },
      ],
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.browser.json",
        }),
      ],
      extensions: [".js", ".ts", ".tsx", ".json"],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: root("./index.html"),
      }),
      new ProvidePlugin({
        React: "react",
      }),
    ],
  };
}
