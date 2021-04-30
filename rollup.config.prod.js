import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import importmap from "@eik/rollup-plugin";
import postcss from "rollup-plugin-postcss";
import postcssLessLoader from "rollup-plugin-postcss-webpack-alias-less-loader";
import typescript from "@rollup/plugin-typescript";
import path from "path";

export default {
  input: "src/index.tsx",
  plugins: [
    importmap({
      maps: [
        {
          imports: {
            react: "https://neik.dev.intern.nav.no/npm/react/v17/package/index.js",
            "react-dom": "https://neik.dev.intern.nav.no/npm/react-dom/v17/package/index.js",
          },
        },
      ],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    babel({
      presets: ["@babel/preset-react"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs({
      include: ["node_modules/**"],
    }),
    json(),
    typescript(),
    postcss({
      extract: path.resolve("dist/bundle.css"),
      loaders: [
        postcssLessLoader({
          nodeModulePath: "./node_modules",
          aliases: {},
        }),
      ],
    }),
  ],
  output: [
    {
      file: "dist/bundle.esm.js",
      format: "esm",
      plugins: [terser()],
    },
  ],
};
