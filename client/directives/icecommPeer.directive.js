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
              $scope.connect();
              $scope.counter = 60;
            }
          };

          var mytimeout = $timeout($scope.onTimeout,1000);
        });


        comm.on("disconnect", function(peer){
          // $scope.$apply(function () {
            $scope.connect();
            $scope.searching = false;
            $scope.peers.splice($scope.peers.indexOf(peer),1);
            
          // });
        });
      }
    };
  }
})();