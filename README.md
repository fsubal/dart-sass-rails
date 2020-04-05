# dart-sass-rails

Make `asset-url()` helper work outside of sassc-rails, porting to dart-sass

### Why?

Because you want to stop using Ruby on Rails' asset pipeline, without throwing your .sass/.scss files away.

### How to use

Pass it to sass-loader in webpack, or dart-sass option.

```js
import sass from 'sass';
import dartSassRails from 'dart-sass-rails';

{
    test: /\.(scss|sass|css)$/i,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: "css-loader",
            options: {},
        },
        {
            loader: "resolve-url-loader",

            // Required if you use resolve-url-loader 3.0+
            options: {
                root: "",
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                implementation: sass,
                sassOptions: {
                    functions: dartSassRails({
                        assetRootPath: path.join(railsRoot, 'app', 'assets'),
                        imagesPath: '/images',
                        fontsPath: '/fonts',
                    }),
                    includePaths: [path.join(railsRoot, 'app', 'assets', 'stylesheets')],
                },
            },
        }
    ]
}
```

### See also

- [node-sass-asset-functions](https://github.com/fetch/node-sass-asset-functions): dart-sass-rails is inspired by this lib. If you are using node-sass, use that instead.
- [resolve-url-loader](https://github.com/bholloway/resolve-url-loader): should be used alongside with dart-sass-rails. Currently dart-sass-rails emits full file paths for `url()`, and resolve-url-loader transforms to proper urls.
