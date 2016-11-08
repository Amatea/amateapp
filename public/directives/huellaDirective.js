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
	})

.directive('timeland', function() {
		return {
			restrict: 'E',
			templateUrl: '/partials/timeland.html',
		};
	})

	.directive('profile', function() {
		return {
			restrict: 'E',
			templateUrl: '/partials/profile.html',
		};
	});