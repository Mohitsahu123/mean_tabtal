tabtalent.controller('ProfileController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $rootScope.activeLink = 'profile';
    $(document).on("focus", ".datepickerexp", function(){
        $(this).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        })
        .change(dateChanged)
        .on('changeDate', dateChanged);
    });

    $(document).on("focus", ".datepickeredu", function(){
        $(this).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        })
            .change(dateEduChanged)
            .on('changeDate', dateEduChanged);
    });

    $scope.experience = {};
    $scope.education = {};
    $scope.skill = {};
    
    function dateChanged(e) {
        var name = e.target.name;

        if(name == 'datefrom'){
            $scope.experience.dateFrom = e.target.value;
        } else {
            $scope.experience.dateTo = e.target.value;
        }
    }

    
    $scope.addExperience = function () {
        if($scope.selectedCompany){
            $scope.experience.selectedCompany = $scope.selectedCompany;
            if(typeof $scope.selectedCompany.originalObject == 'string'){
                $scope.experience.companyName = $scope.selectedCompany.originalObject;
                $scope.experience.linkedTo = null;
                $scope.experience.user_id = null;
            } else {
                $scope.experience.companyName = $scope.selectedCompany.originalObject.name;
                $scope.experience.linkedTo = $scope.selectedCompany.originalObject._id
                $scope.experience.user_id = $rootScope.user.id;
            }
        }
       
        $http.post('/users/addExperience', $scope.experience).then(function (res) {
           $scope.experience = res.data;
            $rootScope.user.experiences.push($scope.experience);
            localStorage.setItem('TabTalentUser', JSON.stringify($rootScope.user));
            $scope.experience = {};
        })
    };
    
    $scope.removeExperience = function (index) {
        
        $http.post('/users/removeExperience', $rootScope.user.experiences[index]).then(function (res) {
            $rootScope.user.experiences.splice(index, 1);
            localStorage.setItem('TabTalentUser', JSON.stringify($rootScope.user));
        })
    };
    
    $scope.addSkill = function () {
        $scope.skill.user_id = $rootScope.user.id;
        $http.post('/users/addSkill', $scope.skill).then(function (res) {
            $scope.skill = res.data;
            $rootScope.user.skills.push($scope.skill);
            localStorage.setItem('TabTalentUser', JSON.stringify($rootScope.user));
            $scope.skill = {};
        })
    };

   

   
    
}]);