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
		when('/profile', {
			templateUrl: 'partials/profile.html'
		}).
		when('/mapa', {
			templateUrl: 'partials/mapa.html'
		}).
		when('/treebirds', {
			templateUrl: 'partials/treebirds.html'
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
app.filter('trustUrl', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
});

app.factory('Aves', ['$resource', function($resource){
	return $resource('api/aves/:id', {id: '@_id'}, {
		update: { method: 'PUT'},
		get: { method: 'GET', isArray: false},
		show: { method: 'GET'}
	})
}]);

app.factory('Authentication', [
  function() {
    this.user = window.user;

    return {
      user: this.user
    };
  }
]);