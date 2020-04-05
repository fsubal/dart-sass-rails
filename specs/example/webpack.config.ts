import sass from "sass";
import path from "path";
import dartSassRails from "../../src";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const publicPath = "/bundles/";

const railsRoot = __dirname;
const frontendPath = path.join(railsRoot, "frontend");
const assetsPath = path.join(railsRoot, "app", "assets");
const stylesheetsPath = path.join(assetsPath, "stylesheets");

const fileRule = {
  test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
  use: [
    {
      loader: "file-loader",
      options: {
        publicPath,
        name: "[name].[hash].[ext]",
        esModule: false,
      },
    },
  ],
};

const sassRule = {
  test: /\.(scss|sass|css)$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: "[local]--[hash:base64:6]",
        },
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
        implementation: sass,
        sassOptions: {
          sourceComments: false,
          functions: dartSassRails({
            assetRootPath: assetsPath,
            imagesPath: "/images",
            fontsPath: "/fonts",
          }),
          includePaths: [stylesheetsPath],
        },
      },
    },
  ],
};

const typescriptRule = {
  test: /\.tsx?$/,
  include: [frontendPath],
  use: [
    {
      loader: "ts-loader",
      options: {
        configFile: path.resolve(railsRoot, "tsconfig.json"),
        happyPackMode: true,
        transpileOnly: true,
        compilerOptions: {
          module: "esnext",
        },
      },
    },
  ],
};

/**
 * Using multi-compiler mode
 *
 * @see https://github.com/webpack/webpack/tree/c38e226717a6648a1faafd8dbb46d1fba1396a5d/examples/multi-compiler
 */
export default [
  /**
   * compiler for /frontend
   */
  {
    name: "frontend",
    entry: {
      index: path.join(frontendPath, "index.ts"),
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modules: [frontendPath, "node_modules"],
    },
    module: {
      rules: [fileRule, sassRule, typescriptRule],
    },
  },

  /**
   * compiler for /app/assets
   */
  {
    name: "assets",
    entry: {
      application: path.join(stylesheetsPath, "application.scss"),
    },
    resolve: {
      extensions: [".scss"],
      modules: [stylesheetsPath],
    },
    module: {
      rules: [fileRule, sassRule],
    },
  },
];
