import { builtinModules } from "module";
import { Config } from "bili";

const config: Config = {
  input: "src/index.ts",
  plugins: {
    commonjs: {
      // https://github.com/proteriax/rollup-plugin-ignore#usage
      ignore(name: string) {
        return builtinModules.includes(name);
      },
    },
    typescript2: {
      objectHashIgnoreUnknownHack: false,
    },
  },
  output: {
    format: ["cjs-min", "esm-min"],
  },
};

export default config;
