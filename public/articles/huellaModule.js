var app = angular.module('articles', []);

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