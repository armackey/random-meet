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
      template: '<button ng-click="connect()" ng-hide="foundRoom">Connect</div>',
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
            console.log($scope.message);
            if (data.room) {
              console.log('found room', data.room);
              $scope.room = data.room;
              var connectOptions = createConnectOptions();
              comm.connect($scope.room, connectOptions);
              $scope.foundRoom = true;
            }
          });

          $timeout(function () {
            if ($scope.foundRoom === false) {
              $scope.message = 'Could not find room and now creating one';
              console.log($scope.message);
              $scope.room = user.room;
              $http.put('/makeRoom', user); 
              var connectOptions = createConnectOptions();
              comm.connect($scope.room, connectOptions);
              $scope.foundRoom = true;

            }
          }, 4000);
          console.log(atts.room);
          
          console.log($scope.room);

          console.log(atts.room);
          console.log(atts);
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