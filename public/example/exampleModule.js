var app = angular.module('example', []);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partials/inicio.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);

app.controller('ExampleController', ['$scope', 'Authentication', '$window',
  function($scope, Authentication, $window) {
    $scope.authentication = Authentication;
  }
]);