// Crear el controller 'articles'
angular.module('articles')

.controller('calculoController', ['$scope', '$routeParams', 'Articles', '$mdDialog',
    function($scope, $routeParams, Articles, $mdDialog) {
    
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
              return 5
            }
            else if (total < 20){
              return 7
            }
            else if (total < 25){
              return 10
            }
            else if (total < 30){
              return 13
            }
            else if (total < 35){
              return 16
            }
            else if(total < 40){
            return 20;
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
        templateUrl: 'articles/views/arboles.html',
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

  function CheckoutController($scope, Articles, $location,  $routeParams, $mdDialog, totalAmount, article) {
    $scope.totalAmount = totalAmount();
    $scope.article = article;

    $scope.article = Articles.get({
              articleId: $routeParams.articleId
            })
      
        $scope.addArbol = function() {
            $scope.article.$update(function() {
                $location.path('/' + $scope.article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    
  }

}])