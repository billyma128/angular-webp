# angular-webp

Make sure that webp supported by your server, this is an demo of [QiNiu CDN](http://developer.qiniu.com/code/v6/api/kodo-api/image/imagemogr2.html#introduction).

``` javascript
angular.module('app').config(config)

config.$inject = ['webPConfig']
function config(webPConfig) {
  webPConfig.url_to_identify = 'test.com' // used by identify the images that need to switch format
  webPConfig.url_prefix = 'http://cdn.test.com'  // if src of image start with relative path, prepend to the src
  webPConfig.format_rule = '?imageMogr2/strip/format/webp' // format rule provided by your server, append to the src
}
```
