var app = angular.module('huellas', []);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/articles/transporte/:articleId', {
			templateUrl: 'huella/views/transporte.html'
		}).
		when('/arboles/', {
			templateUrl: 'huella/views/arboles.html'
		}).
		when('/articles/vida/:articleId', {
			templateUrl: 'huella/views/vida.html'
		}).
		when('/articles/consumo/:articleId', {
			templateUrl: 'huella/views/consumo.html'
		}).
		when('/articles/calculo/:articleId', {
			templateUrl: 'huella/views/calculo-huella.html'
		}).
		when('/articles/edit/:articleId', {
			templateUrl: 'huella/views/hogar.html'
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
