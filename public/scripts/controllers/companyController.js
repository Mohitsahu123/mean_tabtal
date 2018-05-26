tabtalent.controller('CompanyController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $rootScope.activeLink = 'companies';
    $scope.industry = [];
    $scope.company = {};
    $scope.companies = [];
    $scope.company.industries = [];
    $scope.addCompany = function () {
        $scope.industry.forEach(function (value) { 
            if(value!=''){
                $scope.company.industries.push(value);
            }
        });
        console.log($rootScope.user)
        if($scope.selectedCompany.originalObject.name){
            $scope.company.name = $scope.selectedCompany.originalObject.name;
        } else {
            $scope.company.name = $scope.selectedCompany.originalObject;
        }
        $scope.company.created_by = $rootScope.user.id;
        $http.post('/company/addCompany', $scope.company).then(function (res) {
            $scope.companies.push(res.data);
            $scope.company = {};
            $scope.company.industries = [];
            $scope.industry = [];
            $scope.industries = [''];
            $scope.$broadcast('angucomplete-alt:clearInput');
        })
    };
    
    
    $scope.industries = [''];
    
    $scope.addIndustryInput = function () {
        $scope.industries.push('');
    };

    $scope.getallCompanyData = function () {
        $http.get('/company/getall').then(function (response) {
            $scope.companies = response.data;
        })    
    };
    
}]);