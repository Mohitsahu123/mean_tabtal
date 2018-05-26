tabtalent.controller('LoginController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $scope.post = function () {

        $http.post('/users/login', $scope.cred).then(function (res) {
            $rootScope.user = res.data.user;
            $state.go('app.profile');
        }, function (error) {
            $scope.message = error.data.message;
        });
    }
    
}]);