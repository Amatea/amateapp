var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, [
  'ngResource',
  'ngRoute', 
  'ngMaterial', 
  'ngMessages',
  'ngAnimate',
  'ngAnimate',
  'users',
  'huellas'
  
  ]);

mainApplicationModule.config(['$locationProvider', '$mdThemingProvider',
  function($locationProvider, $mdThemingProvider) {
    $locationProvider.hashPrefix('!');
    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('pink');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});