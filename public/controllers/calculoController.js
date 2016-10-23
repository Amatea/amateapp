// Crear el controller 'articles'
angular.module('huellas')

.controller('calculoController', ['$scope', '$routeParams', '$location', 'Articles', '$mdDialog',
    function($scope, $routeParams, $location, Articles, $mdDialog) {
    
    $scope.inicio = function() {
            $location.path('/' + $scope.article._id);
        }

    $scope.cerrar = function() {
        $location.path('/signout');
    }
    
    $scope.findOne = [
      $scope.article = Articles.get({
          articleId: $routeParams.articleId
        })
      ];

    $scope.total = function() {
            var total = 0;
            $scope.findOne.forEach(function(item) {
                total = item.p1+item.p2+item.p3+item.p4+item.p5+item.p6+item.p7+item.p8+item.p9+item.p10+item.p11;
            })

            if (total < 10){
              return 3
            }
            else if (total < 15){
              return 10
            }
            else if (total < 20){
              return 12
            }
            else if (total < 25){
              return 14
            }
            else if (total < 30){
              return 16
            }
            else if (total < 35){
              return 18
            }
            else if (total < 37){
              return 22
            }
            else if(total < 40){
            return 30;
            }
            else{
              return 6
            }
    };
        
      $scope.total2 = function(){
      var total = [];
      $scope.findOne.forEach( function(item){
        total = item.p1+item.p2+item.p3+item.p4+item.p5+item.p6+item.p7+item.p8+item.p9+item.p10+item.p11;
      })
      return total;
        }

    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: CheckoutController,
        templateUrl: 'partials/arboles.html',
        resolve: {
              totalAmount: function () {
                return $scope.total;
              },
              article: function () {
                return $scope.article;
              }
            },
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        
      })
      .then(function(answer) {
      $scope.status = 'Tu informción fue enviada "' + answer + '".';
        }, function() {
          $scope.status = 'Has cancelado el dialogo.';
        });
  };

  function CheckoutController($scope, Articles, $location,  $routeParams, $mdDialog, totalAmount, article, $timeout, $window) {
    $scope.totalAmount = totalAmount();
    $scope.article = article;

    $scope.article = Articles.get({
              articleId: $routeParams.articleId
            })
      
        $scope.addArbol = function() {
            $scope.article.$update(function(callback) {
                $timeout (function () {
                  callback($location.path('/profile'),$window.location.reload()
                  );
                }, 1000);
                
            })
            
        };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    
  }

}])