(function() {
  'use strict';

  angular.module('icecomm.peer', [])
  .directive('icecommPeer', icecommPeer);

  function icecommPeer($sce, $timeout, $http) {
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,
      template:
      '<video ng-repeat="peer in peers" class="icecomm-peer"' +
        'autoplay ng-src="{{peer.stream}}"></video>',
      link: function($scope, ele, atts, icecomm) {
        var comm = icecomm.comm;
        $scope.peers = [];
        comm.on("connected", function(peer){
          
          $scope.counter = 10;
          $scope.onTimeout = function(){
              $scope.counter--;
              mytimeout = $timeout($scope.onTimeout,1000);

              if ($scope.counter === 0) {
                // disconnect 
                $timeout.cancel(mytimeout);
                $scope.connect();
                $scope.counter = 10;

                
                
              }
          };

          var mytimeout = $timeout($scope.onTimeout,1000);

          

          $scope.$apply(function () {
            peer.stream = $sce.trustAsResourceUrl(peer.stream);
            $scope.peers.push(peer);
            console.log($scope.peers);
          });
        });

        comm.on("disconnect", function(peer){
          // $scope.$apply(function () {
            console.log(comm, 'on disconnect');
            console.log('lost peer');
            $scope.peers.splice($scope.peers.indexOf(peer),1);
            
          // });
        });
      }
    };
  }
})();