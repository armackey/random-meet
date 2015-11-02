(function() {
  'use strict';

  angular.module('icecomm.connect', [])
  .directive('icecommConnect', icecommConnectDirective);

  function icecommConnectDirective($http, $timeout, $state, $interval) {
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,
      template: '<button ng-click="connect()" class="join" ng-hide="foundRoom">Connect</div>',
      link: function($scope, ele, atts, comm) {
        $scope.text = atts.text || "Connect";
        $scope.connect = function() { 
          $state.go('chat');
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
              console.log('found room', data.room);
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
              console.log('created room', user.room);
              $scope.message = 'Welcome to room ' + $scope.room;
              $scope.room = user.room;
              
              comm.connect($scope.room, connectOptions);
              console.log($scope.room);
               
              $scope.foundRoom = true;
              console.log($scope.foundRoom);
            }
          }, 2000);
          

          
          
      
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