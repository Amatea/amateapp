'use strict';

angular.module('huellas')

.controller('hogarController', ['$scope', '$routeParams', '$location', 'Articles', '$mdDialog',
    function($scope, $routeParams, $location, Articles, $mdDialog) {
       
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

        $scope.inicio = function() {
            $location.path('/' + $scope.article._id);
        }

        $scope.cerrar = function() {
            $location.path('/signout');
        }

        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
            controller: DialogController,
            templateUrl: 'partials/dialog.hogar.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })  
        };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }
 }]);