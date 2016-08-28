angular.module('example').controller('ExampleController', ['$scope', 'Authentication', '$window',
  function($scope, Authentication, $window) {
    $scope.authentication = Authentication;

    
  }
]);