export default {
  input: "src/index.ts",
  plugins: {
    typescript2: {
      objectHashIgnoreUnknownHack: false,
    },
  },
  output: {
    format: ["cjs-min", "esm-min"],
  },
};
