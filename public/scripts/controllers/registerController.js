tabtalent.controller('RegisterController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $scope.data = {};
    
    $(document).on("focus", ".datepickerUser", function(){
        $(this).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        })
            .change(dateChanged)
            .on('changeDate', dateChanged);
    });
    
    $scope.addExperience = function () {
        $rootScope.user.experiences.push({});
    };

    
    if($rootScope.user.experiences && $rootScope.user.experiences.length == 0){
        $rootScope.user.experiences.push({});
    } else {
        setTimeout(function () {
            $rootScope.user.experiences.forEach(function (toMatch, index) {
                var id = 'autoname'+index;
                $scope.$broadcast('angucomplete-alt:changeInput', id, toMatch.companyName);
                $scope.$apply()
            });
        }, 1000)
    }
    
    $scope.postDetails = function () {

        var toPush = [];
        $rootScope.user.experiences.forEach(function (value, index) {
            if(!angular.equals(value, {})){
                toPush.push(index);
            }
        });
        var temp = [];
        toPush.forEach(function (value) {
            temp.push($rootScope.user.experiences[value])
        });
        $rootScope.user.experiences = temp;
        
        console.log($rootScope.user.experiences);
        $rootScope.user.experiences.forEach(function (toMatch, index) {
            if(toMatch.selectedCompany){
                if(typeof toMatch.selectedCompany.originalObject == 'string'){
                    toMatch.companyName = toMatch.selectedCompany.originalObject;
                    toMatch.linkedTo = null;
                } else {
                    toMatch.companyName = toMatch.selectedCompany.originalObject.name;
                    toMatch.linkedTo = toMatch.selectedCompany.originalObject._id
                }
            }
        });


        console.log($rootScope.user.experiences);
        
        $http.put('/users/update', $rootScope.user).then(function (res) { 
            $rootScope.user =  res.data;
            $rootScope.user.skills =  $rootScope.user.skills || [];
            $rootScope.user.educations = $rootScope.user.educations  || [];
            localStorage.setItem('TabTalentUser', JSON.stringify($rootScope.user));
            $state.go('app.profile');
        })    
    };
    
    function dateChanged(e) {
        var name = e.target.name.substr(0, e.target.name.length-1);
        var index = e.target.name.substr(e.target.name.length-1, 1);
        
        if(name == 'datefrom'){
            $rootScope.user.experiences[parseInt(index)].dateFrom = e.target.value;
        } else {
            $rootScope.user.experiences[parseInt(index)].dateTo = e.target.value;
        }
        console.log("\r\n\n\ e ", e);
        e.target.value = null;
    }

    $scope.getallCompanyData = function () {
        $http.get('/company/getall').then(function (response) {
            $scope.companies = response.data;
        })
    };
    
}]);