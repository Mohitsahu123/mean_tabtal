var tabtalent = angular.module('tabtalent', ['ui.router', 'angucomplete-alt']);

tabtalent.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

        .state('app',{
            url:'/',
            views: {
                'header': {
                },
                'content': {
                    templateUrl: '../template/signup/signup.component.html',
                    controller: 'SignupController'
                }
            }
        })
        
      
       

      

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/');

});


tabtalent.run(function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});