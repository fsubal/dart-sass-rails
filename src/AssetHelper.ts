import fs from "fs";
import url from "url";
import path from "path";

export interface Option {
  imagesPath: string;
  fontsPath: string;
  assetRootPath: string;
}

export default class AssetHelper {
  constructor(private readonly option: Option) {}

  assetUrl(filename: string) {
    switch (path.extname(filename)) {
      case ".eot":
      case ".ttf":
      case ".woff":
        return this.fontUrl(filename);

      default:
        return this.imageUrl(filename);
    }
  }

  imageUrl(filename: string) {
    return this.resolveUrl(filename, this.option.imagesPath);
  }

  fontUrl(filename: string) {
    return this.resolveUrl(filename, this.option.fontsPath);
  }

  private resolveUrl(filename: string, dir: string) {
    const [httpPath, fragment] = path
      .join(dir, filename)
      .replace(/\\/g, "/") // drop backslashes
      .split("#"); // drop URL fragment

    if (fragment) {
      // SVG might have "#" in url
      // https://css-tricks.com/svg-fragment-identifiers-work/#article-header-id-2
      return this.absolute(httpPath) + "#" + fragment;
    } else {
      return this.absolute(httpPath);
    }
  }

  /**
   * Resolves absolute path for file-loader
   */
  private absolute(httpPath: string) {
    const { pathname, search } = url.parse(httpPath);
    if (!pathname) {
      throw new Error(`Could not parse path: ${JSON.stringify(httpPath)}`);
    }

    const formatted = path.join(this.option.assetRootPath, pathname);
    if (!fs.existsSync(formatted)) {
      return httpPath;
    }

    const newUrl = url.format({
      pathname: url.parse(formatted).pathname,
      search,
    });

    return newUrl;
  }
}
