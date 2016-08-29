var app = angular.module('users', []);

app.factory('Authentication', [
  function() {
    this.user = window.user;

    return {
      user: this.user
    };
  }
]);