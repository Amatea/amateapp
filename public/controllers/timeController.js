'use strict';

var app = angular.module('huellas')

app.controller('ExampleController', ['$scope', 'Authentication', '$window', '$routeParams', 'Articles',
  function($scope, Authentication, $window, $routeParams, Articles) {
    $scope.authentication = Authentication;

    $scope.articles = Articles.query();
  }]);

app.controller('consum', ['$scope', '$routeParams', '$location', 'Articles',
    function($scope, $routeParams, $location, Articles) {
       
        $scope.find = function() {
            $scope.articles = Articles.query();
        };
        
        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $routeParams.articleId
            });
        };

        $scope.update = function() {
            $scope.article.$update(function() {
                
                $location.path('articles/transporte/' + $scope.article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.inicio = function() {
            $location.path('/' + $scope.article._id);
        }

        $scope.cerrar = function() {
            $location.path('/signout');
        }

}]);