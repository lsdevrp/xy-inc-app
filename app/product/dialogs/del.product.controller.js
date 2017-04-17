'use strict';

angular.module('xy-inc-app')
  .controller('ProductDelCtrl', function ($scope, $mdDialog, productService, product) {
  'use strict';
    
    this.cancel = $mdDialog.cancel;

    $scope.product = product;
    
    $scope.deletar = function () {
      productService.delete($scope.product._id)
        .then( function() {
          console.log("product: " + $scope.product._id + " deletado!");
          onComplete();
        })
        .catch(function(err) {
          $scope.error = err.data;
          $scope.errors = {};
        }); 
    }
    
    function onComplete() {
        $mdDialog.hide();
    }
  
});