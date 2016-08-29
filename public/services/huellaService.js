var app = angular.module('huellas', []);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
      		templateUrl: 'partials/inicio.html'
   		 }).
		when('/articles/transporte/:articleId', {
			templateUrl: 'partials/transporte.html'
		}).
		when('/arboles/', {
			templateUrl: 'huella/views/arboles.html'
		}).
		when('/articles/vida/:articleId', {
			templateUrl: 'partials/vida.html'
		}).
		when('/articles/consumo/:articleId', {
			templateUrl: 'partials/consumo.html'
		}).
		when('/articles/calculo/:articleId', {
			templateUrl: 'partials/calculo-huella.html'
		}).
		when('/articles/edit/:articleId', {
			templateUrl: 'partials/hogar.html'
		}).
		otherwise({
      		redirectTo: '/'
    	});
	}
]); 

app.factory('Articles', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' article
    return $resource('api/articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        
    });
}]);

app.controller('ExampleController', ['$scope', 'Authentication', '$window',
  function($scope, Authentication, $window) {
    $scope.authentication = Authentication;
  }
]);