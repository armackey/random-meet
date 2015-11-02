(function() {
  'use strict';

  angular.module('icecomm.peer', [])
  .directive('icecommPeer', icecommPeer);

  function icecommPeer($sce, $timeout, $http, $interval) {
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: false,
      template:
      '<video ng-repeat="peer in peers" class="icecomm-peer"' +
        'autoplay ng-src="{{peer.stream}}"></video>',
      link: function($scope, ele, atts, icecomm) {
        var comm = icecomm.comm;
        $scope.peers = [];
        console.log($scope);
        comm.on("connected", function(peer){
          
          $scope.$apply(function () {
            peer.stream = $sce.trustAsResourceUrl(peer.stream);
            $scope.peers.push(peer);
          });

          $scope.counter = 60;
          $scope.onTimeout = function(){
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout,1000);

            if ($scope.counter === 0) {
              // disconnect 
              $scope.peers.splice($scope.peers.indexOf(peer),1);
              $timeout.cancel(mytimeout);
              $scope.chat();
              $scope.counter = 60;
            }
          };

          var mytimeout = $timeout($scope.onTimeout,1000);
        });

        $interval(function () {
          console.log('checking peer object');
          if ($scope.peers.length !== 1) {
            // $scope.foundRoom = false;
            $scope.reconnect = 'Let\'s try our search again!';
            $scope.chat();
          }
        }, 15000);

        comm.on("disconnect", function(peer){
          // $scope.$apply(function () {
            $scope.chat();
            $scope.peers.splice($scope.peers.indexOf(peer),1);
            
          // });
        });
      }
    };
  }
})();