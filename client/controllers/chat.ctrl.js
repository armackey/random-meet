angular.module('app')
  .controller('chatCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    console.log($scope);
    $scope.browser = 'Works best in Chrome!';
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
        console.log($scope.message);
        if (data.room) {
          console.log('found room', data.room);
          $scope.room = data.room;
          $scope.foundRoom = true;
        }
      });

      $timeout(function () {
        if ($scope.foundRoom === false) {
          $scope.message = 'Could not find room and now creating one';
          console.log($scope.message);
          $scope.room = user.room;
          $http.put('/makeRoom', user); 
          $scope.foundRoom = true;

        }
      }, 4000);

      // delete room
      // $timeout(function () {
      //   user.room = '';
      //   $http.put('/deleteRoom', user); 
      // }, 5000);
    };

  }]);