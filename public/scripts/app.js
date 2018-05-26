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
        
        .state('app.register',{
            url:'register',
            views: {
                'header': {
                },
                'content@': {
                    templateUrl: '../template/register/register.component.html',
                    controller: 'RegisterController'
                }
            }
        })

        .state('app.signin',{
            url:'signin',
            views: {
                'header': {
                },
                'content@': {
                    templateUrl: '../template/login/login.component.html',
                    controller: 'LoginController'
                }
            }
        })

       
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/');

});


tabtalent.run(function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});
