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
```

### Inspired by

This library is highly influenced by [node-sass-asset-functions](https://github.com/fetch/node-sass-asset-functions). If you are using node-sass, use that instead.
