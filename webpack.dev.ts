// Types
import "webpack-dev-server";
import type { Configuration } from "webpack";

// Common
import { merge } from "webpack-merge";
import { common, root } from "./webpack.common";

export default function (): Configuration {
  return merge(common(), {
    mode: "development",
    devServer: {
      hot: true,
      historyApiFallback: true,
      static: {
        directory: root("./public"),
      },
    },
  });
}
