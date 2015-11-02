angular.module('app')
  .controller('chatCtrl', ['$scope', '$http', '$timeout', '$interval', function ($scope, $http, $timeout, $interval) {
    $scope.chat = function () {

      var user = {};
      $scope.foundRoom = false;
      user.room = "";

      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i+=1 ) {
        user.room += possible.charAt(Math.floor(Math.random() * possible.length));
      } 

      $http.get('/findRoom').success(function (data) {
        $scope.message = data;
        if (data.room) {
          $scope.room = data.room;
          $scope.foundRoom = true;
        }
      });

      $timeout(function () {
        console.log($scope);
        console.log($scope.foundRoom);
        if ($scope.foundRoom === false) {
          $scope.message = 'Welcome to room ' + $scope.room;
          $scope.room = user.room;
          $http.put('/makeRoom', user); 
          $scope.foundRoom = true;
        }
      }, 2000);

      // after 15 seconds and no answer 
      // offer reconnect

   };

  }]);