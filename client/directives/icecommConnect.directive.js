(function() {
  'use strict';

  angular.module('icecomm.connect', [])
  .directive('icecommConnect', icecommConnectDirective);

  function icecommConnectDirective($http, $timeout, $interval) {
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,
      transclude: true,
      controller: 'chatCtrl',
      template: '<button ng-click="connect()" class="join" ng-hide="foundRoom">Connect</div>',
      link: function($scope, ele, atts, comm) {
        $scope.text = atts.text || "Connect";
        $scope.searching = false;
        $scope.connect = function() { 
          $scope.searching = true;
          var connectOptions = createConnectOptions();
          var user = {};
          user.room = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          $scope.foundRoom = false;

          for (var i = 0; i < 5; i+=1 ) {
            user.room += possible.charAt(Math.floor(Math.random() * possible.length));
          } 

          $http.get('/findRoom').success(function (data) {
            $scope.message = data;
            if (data.room) {
              $scope.room = data.room;              
              comm.connect($scope.room, connectOptions);
              console.log($scope.room);
              $scope.foundRoom = true;
            }
          });

          $timeout(function () {
            console.log($scope.foundRoom);
            if ($scope.foundRoom === false) {
              $http.put('/makeRoom', user);
              $scope.message = 'Welcome to room ' + $scope.room;
              $scope.room = user.room;
              comm.connect($scope.room, connectOptions);
              $scope.foundRoom = true;
            }
          }, 2000);


          $interval(function () {
            console.log('checking for peers');
            if ($scope.peers.length !== 1) {
              // $scope.foundRoom = false;
              $scope.reconnect = 'Let\'s try our search again!';
              $scope.connect();
            }
          }, 15000);
      
        };


        function createConnectOptions() {
          var connectOptions = {};
          if (atts.video === 'false') {
            connectOptions.video = false;
          }
          if (atts.audio === 'false') {
            connectOptions.audio = false;
          }
          if (!atts.stream === 'false') {
            connectOptions.stream = false;
          }
          if (!atts.limit) {
            connectOptions.limit = 2;
          }
          return connectOptions;
        }
      }
    };
  }
})();