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
      transclude: true,
      controller: 'chatCtrl',
      template: '<button ng-click="connect()" room="{{room}}"  ng-hide="foundRoom">Connect</div>',
      link: function($scope, ele, atts, comm, chatCtrl) {
        // $scope.text = atts.text || "Connect";
        console.log(chatCtrl());
        console.log($scope);
        console.log(atts);
        $scope.connect = function() { 
          console.log(atts.room);
          $scope.chat();
          
          var connectOptions = createConnectOptions();
          comm.connect($scope.room, connectOptions);
          console.log(atts.room);
          console.log(atts);
        };

        $timeout(function () {
          console.log($scope);
          console.log(atts);
        }, 5000);

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