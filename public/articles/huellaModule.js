var app = angular.module('huellas', []);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/articles/transporte/:articleId', {
			templateUrl: 'articles/views/transporte.html'
		}).
		when('/arboles/', {
			templateUrl: 'articles/views/arboles.html'
		}).
		when('/articles/vida/:articleId', {
			templateUrl: 'articles/views/vida.html'
		}).
		when('/articles/consumo/:articleId', {
			templateUrl: 'articles/views/consumo.html'
		}).
		when('/articles/calculo/:articleId', {
			templateUrl: 'articles/views/calculo-huella.html'
		}).
		when('/articles/edit/:articleId', {
			templateUrl: 'articles/views/edit-article.client.view.html'
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
