var app = angular.module('example', []);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'example/views/example.client.view.html'
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