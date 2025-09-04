// Types
import type { Configuration } from "webpack";

// Common
import { merge } from "webpack-merge";
import { common } from "./webpack.common";

export default function (): Configuration {
  return merge(common(), {
    mode: "production",
  });
}
