angular.module('app')
  .controller('chatCtrl', ['$scope', '$http', '$timeout', '$interval', function ($scope, $http, $timeout, $interval) {
    $scope.chat = function () {
      console.log($scope);
      $scope.connect();

   };

  }]);