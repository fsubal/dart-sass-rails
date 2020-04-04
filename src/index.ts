import sass from "sass";
import AssetHelper, { Option } from "./AssetHelper";

const dartSassRails = (options: Option) => {
  const h = new AssetHelper(options);

  return {
    /**
     * ex)
     *
     * ```sass
     * backgroung-image: asset-url('hoge.png')
     * ```
     */
    "asset-url($filename, $only_path: false)"(
      $filename: sass.types.String,
      $onlyPath: sass.types.Boolean,
      next: (string: sass.types.String) => void
    ) {
      const url = h.assetUrl($filename.getValue());
      const $value = new sass.types.String(
        $onlyPath.getValue() ? url : `url('${url}')`
      );

      return next($value);
    },

    /**
     * ex)
     *
     * ```sass
     * backgroung-image: image-url('hoge.png')
     * ```
     */
    "image-url($filename, $only_path: false)"(
      $filename: sass.types.String,
      $onlyPath: sass.types.Boolean,
      next: (string: sass.types.String) => void
    ) {
      const url = h.imageUrl($filename.getValue());
      const $value = new sass.types.String(
        $onlyPath.getValue() ? url : `url('${url}')`
      );

      return next($value);
    },

    /**
     * ex)
     *
     * ```sass
     * @font-face
     *  src: font-url('icon_font.eot')
     * ```
     */
    "font-url($filename, $only-path: false)"(
      $filename: sass.types.String,
      $onlyPath: sass.types.Boolean,
      next: (string: sass.types.String) => void
    ) {
      const url = h.fontUrl($filename.getValue());
      const $value = new sass.types.String(
        $onlyPath.getValue() ? url : `url('${url}')`
      );

      return next($value);
    },
  };
};

export default dartSassRails;
