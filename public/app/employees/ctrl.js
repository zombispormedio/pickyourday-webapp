webAppController.employeesCtrl = function ($rootScope, $scope, CompanyService,  $mdDialog) {

	this.getServices=function(){
		CompanyService.servicesAsigned().list({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.services=result.data;
		}, function(){
	
		});
	}
	this.getServices();

	$scope.showInfo=function(employee){
		var f = document.getElementsByClassName("infoEmployee");
		var i;

			console.log(employee);
		for(i=0;i<f.length;i++){
			if(f[i]==employee)
				f[i].style.display="block";
		}			
	}

	$scope.showDialog = function(ev) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'app/employees/newEmployee.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

};
function DialogController($scope, $mdDialog) {
	  $scope.hide = function() {
	    $mdDialog.hide();
	  };
	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	  };
	}