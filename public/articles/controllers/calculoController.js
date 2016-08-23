// Crear el controller 'articles'
angular.module('articles')

.controller('calculoController', ['$scope', '$routeParams', '$location', 'Articles', '$modal', '$mdDialog',
    function($scope, $routeParams, $location, Articles, $modal, $mdDialog) {
    $scope.status = '  ';
  $scope.customFullscreen = false;

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


      $scope.checkout = function () {
        $modal.open({
          templateUrl: 'articles/views/arboles.html',
          controller: 'CheckoutController',
          resolve: {
            totalAmount: $scope.total,
            article: $scope.article
				  }
			});
		};




}])

.controller('CheckoutController', ['$scope', '$routeParams', '$location', 'Articles', 'totalAmount', 'article',
    function($scope, $routeParams, $location, Articles, totalAmount, article) {

      $scope.totalAmount = totalAmount;
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
        
}]);