'use strict';

var app = angular.module('huellas')



 app.controller('treebirdsController', ['$scope', '$routeParams', 'Aves',
  function($scope, $routeParams, Aves) {

    $scope.ave = Aves.query();
  }]);