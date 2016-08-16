// Crear el controller 'articles'
angular.module('articles').controller('calculoController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
    function($scope, $routeParams, $location, Authentication, Articles) {

  
            // Usar el método 'get' de article para enviar una petición GET apropiada
            $scope.article = Articles.get({
                articleId: $routeParams.articleId
            });
        
        
	

  // Crear un nuevo método controller para actualizar un único article
        $scope.addArbol = function() {
            // Usar el método '$update' de article para enviar una petición PUT apropiada
            $scope.article.$update(function() {
                // Si un article fue actualizado de modo correcto, redirigir el user a la página del article 
                $location.path('/' + $scope.article._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

  $scope.total = function() {
          var total = [];
          angular.forEach($scope.article, function(item) {
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

      }
      
      $scope.guardar = function () {
        var huellas = $scope.huella;
        $scope.huella = [];
          angular.forEach(huellas, function(arbol) {
                $scope.huella.push(arbol);
            });
      };


      $scope.total2 = function(){
      var total = 0;
      angular.forEach($scope.huella, function(item){
        total = item.p1+item.p2+item.p3+item.p4+item.p5+item.p6+item.p7+item.p8+item.p9+item.p10+item.p11;
      })

      return total;
    }
    

    }
]);
