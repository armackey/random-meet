(function() {
  'use strict';

  angular.module('icecomm.connect', [])
  .directive('icecommConnect', icecommConnectDirective);

  function icecommConnectDirective($http, $timeout, $state, $interval) {
    return {
      restrict: 'E',
      require: '^icecomm',

      transclude: true,
      controller: 'chatCtrl',
      template: '<button ng-click="connect()" class="join" ng-hide="foundRoom">Connect</div>',
      link: function($scope, ele, atts, comm, chatCtrl) {
        $scope.text = atts.text || "Connect";
        // $scope.chat();
        $scope.connect = function() { 
          $state.go('chat');
          $scope.chat();
          console.log($scope.room);

          var connectOptions = createConnectOptions();
          comm.connect($scope.room, connectOptions);
         
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