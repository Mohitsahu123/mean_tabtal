tabtalent.controller('HeaderController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $scope.logout = function () {
        localStorage.removeItem('TabTalentUser');
    }
}]);