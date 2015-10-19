(function() {
  'use strict';

  angular.module('icecomm.connect', [])
  .directive('icecommConnect', icecommConnectDirective);

  function icecommConnectDirective($http, $timeout) {
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,
      scope: true,
      template: '<button ng-click="connect()">Connect</div>',
      link: function($scope, ele, atts, comm) {
        // $scope.text = atts.text || "Connect";
        $scope.message = '';
        $scope.connect = function() {   
          var user = {};
          user.room = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < 5; i+=1 ) {
            user.room += possible.charAt(Math.floor(Math.random() * possible.length));
          }
            console.log(user);
          var foundRoom = false;

          $http.get('/findRoom').success(function (data) {
            console.log(data);
            console.log('looking on db for room');
            $scope.message = data.message;
            if (data.room) {
              console.log('found room', data.room);
              var connectOptions = createConnectOptions();
              comm.connect(data.room, connectOptions);
              foundRoom = true;
            }
          });
      
          $timeout(function () {
            if (foundRoom === false) {
              console.log('could not find room and now creating one');
              $scope.message = 'Currently creating room';
              $http.put('/makeRoom', user);
              var connectOptions = createConnectOptions();
              comm.connect(user.room, connectOptions);    
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
            connectOptions.limit = atts.limit;
          }
          return connectOptions;
        }
      }
    };
  }
})();