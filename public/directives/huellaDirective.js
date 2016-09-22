angular.module('huellas')

.directive('toolbar', function() {
		return {
			restrict: 'E',
			templateUrl: '/partials/toolbar.html',
		};
	})

.directive('footer', function() {
		return {
			restrict: 'E',
			templateUrl: '/partials/footer.html',
		};
	});