# angular-webp

Make sure that webp supported by your server, this is an demo of [QiNiu CDN](http://developer.qiniu.com/code/v6/api/kodo-api/image/imagemogr2.html#imagemogr2-specification).

``` javascript
angular.module('app').config(config)

config.$inject = ['webPConfig']
function config(webPConfig) {
  webPConfig.url_to_identify = 'test.com' // used by identify the images that need to switch format
  webPConfig.url_prefix = 'http://cdn.test.com'  // if src of image start with relative path, prepend to the src
  webPConfig.format_rule = '?imageMogr2/strip/format/webp' // format rule provided by your server, append to the src
}
```

# changelog
<a name='0.1.0'></a>
## 0.1.0

_ Initial release.

### Features

- **iSrc**
  - replace image's src to webp format
- **url_to_identify**
  - used by identify the images that need to switch format
- **url_prefix**
  - if src of image start with relative path, prepend to the src
- **format_rule**
  - format rule provided by your server, append to the src

<a name="0.2.0"></a>
## [0.2.0](https://github.com/KennethMa/angular-webp/compare/0.1.0...0.2.0)

### Features
- **thumbnail**
  - [Scale operation parameters](http://developer.qiniu.com/code/v6/api/kodo-api/image/imagemogr2.html#imagemogr2-thumbnail-spec)

### Bug fixes
- **iSrc**
  - terminating the directive if the iSrc is undefined
