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
      template: '<button ng-click="connect()" ng-hide="foundRoom">Connect</div>',
      link: function(scope, ele, atts, comm) {
        // scope.text = atts.text || "Connect";
        
        scope.connect = function() { 
          
          scope.chat();
          console.log(scope.room);
          var connectOptions = createConnectOptions();
          comm.connect(scope.room, connectOptions);

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