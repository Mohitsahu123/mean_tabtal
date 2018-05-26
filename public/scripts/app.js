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

        .state('app.profile',{
            url:'profile',
            views: {
                'header@': {
                    templateUrl: '../template/header/header.component.html',
                    controller: 'HeaderController'
                },
                'content@': {
                    templateUrl: '../template/profile/profile.component.html',
                    controller: 'ProfileController'
                }
            }
        })

        .state('app.company',{
            url:'company',
            views: {
                'header@': {
                    templateUrl: '../template/header/header.component.html',
                    controller: 'HeaderController'
                },
                'content@': {
                    templateUrl: '../template/company/company.component.html',
                    controller: 'CompanyController'
                }
            }
        });

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
