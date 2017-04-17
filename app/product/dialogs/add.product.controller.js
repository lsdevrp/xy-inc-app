'use strict';

angular.module('xy-inc-app')
  .controller('ProductAddCtrl', function ($scope, $mdDialog, $timeout, $window, productService) {
  'use strict';
    
    this.cancel = $mdDialog.cancel; 

    $timeout(function () {
       var element = $window.document.getElementById('txtName');
       if (element) element.focus();
    }, 100);   
    
    this.addItem = function () {
      $scope.item.form.$setSubmitted();
      if($scope.item.form.$valid) {
        productService.add($scope.productTela)
          .then( function() {
            console.log("product: " + $scope.productTela.name + " adicionado!");
            onComplete();
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};
          });
      }
    }
    
    function onComplete() {
        $mdDialog.hide();
    }
  
});