webAppController.ServicesCtrl = function ($scope, CompanyService,  $mdSidenav, $mdDialog) {
   
  

  this.getServices=function(){
		CompanyService.services().get({},function(result){
			if(result.error)
				return console.log(result.error);
			$scope.services=result.data;
		}, function(){

		});
	}
	this.getServices();

  /*$scope.getServicesByCategory = function(){
    CompanyService.servicesByCategory().get({category: $scope.profile},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.servicesByCategory=result.data;
    }, function(){

    });
  }
  $scope.servicesByCategory();*/

  $scope.getResourcesByServices = function(){
    CompanyService.resourcesByServices().list({service:$scope.selectedService},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.resourcesByServices=result.data[0];
      console.log($scope.resourcesByServices);
    },function(){

    });
  }
  
	$scope.resourcesView = function(index) {
    	$mdSidenav('right').toggle();
      console.log($scope.services[index]._id);
      $scope.selectedService = $scope.services[index]._id;
      $scope.getResourcesByServices();
  };

  $scope.toggle = function(resourceByService){
    CompanyService.toggleService().change({},{resource:resourceByService.resource._id,service:$scope.selectedService},function(result){
      if(result.error)
        return console.log(result.error);
      $scope.toggleService=result.data;
      console.log($scope.toggleService);
    })

  }
  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/services/newService.tmpl.html',
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

  $scope.delete=function(index){
    CompanyService.services().delete({id:$scope.services[index]._id}, function(result){
      
      if(result.error)
        return console.log(result.error);
      $scope.promotions.splice(index,1);
      $scope.showAlert();
      $rootScope.go("app.services");
    }, function(){    
        
    });
  }
  $scope.showAlert = function() {
    $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('')
          .textContent('¡Servicio eliminado correctamente!')
          .ariaLabel('Alert Dialog Demo')
          .ok('OK')
      );
    };
}