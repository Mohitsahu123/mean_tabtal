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

    
  
}]);