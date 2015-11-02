angular.module('app',
    [
    'ui.router',
    'icecomm.controller',
    'icecomm.connect',
    'icecomm.local',
    'icecomm.peer',
    'icecomm.leave',
    'angular-circular-progress'
  ])
  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/partials/home.html',
            controller: 'chatCtrl',
            controllerAs: 'chatCtrl'
        });
        // .state('chat', {
        //     url: '/chat',
        //     templateUrl: '/partials/chat.html',
        //     controller: 'chatCtrl',
        //     controllerAs: 'chatCtrl'
        // });
       
        $urlRouterProvider.otherwise('/');

  });