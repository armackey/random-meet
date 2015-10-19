angular.module('app',
    [
    'ui.router',
    'icecomm.controller',
    'icecomm.connect',
    'icecomm.local',
    'icecomm.peer',
    'icecomm.leave'
  ])
  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
        .state('/chat', {
            url: '/',
            templateUrl: '/partials/chat.html',
            controller: 'chatCtrl',
            controllerAs: 'chatCtrl'
        });
       
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

  });