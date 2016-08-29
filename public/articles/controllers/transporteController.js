'use strict';

angular.module('huellas').controller('transporteController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
    function($scope, $routeParams, $location, Authentication, Articles) {
        
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
                $location.path('articles/vida/' + $scope.article._id);
            }, function(errorResponse) {
                
                $scope.error = errorResponse.data.message;
            });
        };

 }]);