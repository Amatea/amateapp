'use strict';

var app = angular.module('huellas')

app.controller('ExampleController', ['$scope', 'Authentication', '$window', '$routeParams', 'Articles',
  function($scope, Authentication, $window, $routeParams, Articles) {
    $scope.authentication = Authentication;

    $scope.articles = Articles.query();

    $scope.data=12;
    $scope.current=2;
  }]);