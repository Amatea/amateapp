'use strict';

angular.module('huellas').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Articles',
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
                $location.path('articles/consumo/' + $scope.article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

 }]);