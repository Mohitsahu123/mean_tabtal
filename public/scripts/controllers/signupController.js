tabtalent.controller('SignupController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    
    $scope.registerUser = function () {
        $http.post('/users/signup', $scope.cred).then(function (res) {
            $rootScope.user = res.data.user;
            
            localStorage.setItem('TabTalentUser', JSON.stringify($rootScope.user));
        }, function (error) { 
            $scope.message = error.data.message;
        });
    }
    
}]);