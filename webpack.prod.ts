// Types
import { Configuration } from "webpack";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

// Common
import { merge } from "webpack-merge";
import { common } from "./webpack.common";

export default function (): Configuration {
  return merge(common(), {
    mode: "production",
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "./public/css", to: "./css" }],
      }),
    ],
  });
}
