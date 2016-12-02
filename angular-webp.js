(function () {
  'use strict';

  angular
    .module('angular-webp', [])
    .constant('webPConfig', {
      url_to_identify: 'test.com',
      url_prefix: 'http://cdn.test.com',
      format_rule: '?imageMogr2/strip/format/webp'
    })
    .directive('iSrc', iSrc)
    .factory('webPService', webPService)

  webPService.$inject = ['$q']
  function webPService($q) {
    var service = {
      webPSupport: webPSupport
    }

    return service

    function webPSupport() {
      var deferred = $q.defer()
      var local_has_webp_value = localStorage.getItem('hasWebP')
      if (local_has_webp_value) {
        deferred.resolve(+local_has_webp_value)
      } else {
        var hasWebP = false
        var img = new Image()
        img.onload = function () {
          hasWebP = !!(img.height > 0 && img.width > 0)
          localStorage.setItem('hasWebP', +hasWebP + '')
          deferred.resolve(hasWebP)
        }
        img.onerror = function () {
          hasWebP = false
          localStorage.setItem('hasWebP', '0')
          deferred.reject(hasWebP)
        }
        img.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA=='
      }

      return deferred.promise
    }
  }

  iSrc.$inject = ['webPConfig', 'webPService']
  function iSrc(webPConfig, webPService) {
    // Usage:
    // <img i-src="img_url" alt="xxx">
    // Creates:
    // angular.module('app', ['angular-webp'])
    var directive = {
      link: link,
      restrict: 'A',
      scope: {
        iSrc: '='
      }
    }
    return directive

    function link(scope, element, attrs) {
      var url_to_identify = webPConfig.url_to_identify
      var url_prefix = webPConfig.url_prefix
      var format_rule = webPConfig.format_rule

      webPService.webPSupport().then(function (hasWebP) {
        if (scope.iSrc.indexOf('http') > -1) {
          if (hasWebP && (scope.iSrc.indexOf(url_to_identify) > -1)) {
            attrs.$set('src', scope.iSrc + format_rule)
          }
          else {
            attrs.$set('src', scope.iSrc)
          }
        } else {
          if (hasWebP) {
            attrs.$set('src', url_prefix + scope.iSrc + format_rule)
          } else {
            attrs.$set('src', url_prefix + scope.iSrc)
          }
        }
      })
    }
  }
})()
