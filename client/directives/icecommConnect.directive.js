(function() {
  'use strict';

  angular.module('icecomm.connect', [])
  .directive('icecommConnect', icecommConnectDirective);

  function icecommConnectDirective($http, $timeout) {
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,

      transclude: true,
      controller: 'chatCtrl',
      template: '<button ng-click="connect()" class="connect" ng-hide="foundRoom">Connect</div>',
      link: function($scope, ele, atts, comm, chatCtrl) {
        // $scope.text = atts.text || "Connect";
        // $scope.chat();
        $scope.connect = function() { 
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
              var connectOptions = createConnectOptions();
              comm.connect($scope.room, connectOptions);
              $scope.foundRoom = true;
            }
          });

          $timeout(function () {
            if ($scope.foundRoom === false) {
              $scope.message = 'Welcome to room ' + $scope.room;
              $scope.room = user.room;
              $http.put('/makeRoom', user); 
              var connectOptions = createConnectOptions();
              comm.connect($scope.room, connectOptions);
              $scope.foundRoom = true;

            }
          }, 2000);

          // after 15 seconds and no answer 
          // offer reconnect
          console.log($scope.peers.length);
          $timeout(function () {
            if ($scope.peers.length !== 1) {
              $scope.foundRoom = false;
              $scope.reconnect = 'Let\'s try our search again!';
            }
          }, 8000);

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