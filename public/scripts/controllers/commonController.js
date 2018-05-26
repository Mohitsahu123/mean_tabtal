tabtalent.controller('IndexController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $rootScope.user = JSON.parse(localStorage.getItem('TabTalentUser'));
    
}]);