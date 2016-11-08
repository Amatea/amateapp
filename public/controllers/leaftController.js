'use strict';

angular.module('huellas')

.controller('leaftController', ['$scope', '$routeParams', '$location', 'Articles', '$mdDialog',
    function($scope, $routeParams, $location, Articles, $mdDialog) {

      angular.extend($scope, {
                yanaconas: {
                    lat: 3.423004,
                    lng: -76.606897,
                    zoom: 15
                },
                defaults: {
                  scrollWheelZoom: false
                }

      }); 
      
 }]);