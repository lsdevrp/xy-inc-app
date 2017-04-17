'use strict';

angular.module('xy-inc-app')
  .controller('ProductEditCtrl', function ($scope, $mdDialog, $timeout, $window, productService, product) {
  'use strict';
    
    this.cancel = $mdDialog.cancel;

    $timeout(function () {
       var element = $window.document.getElementById('txtName');
       if (element) element.focus();
    }, 100);
    
    $scope.status = 
    [{ 
        abrev : "P",
        texto : "Pendente"
    },
    { 
        abrev : "A",
        texto : "Ativo"
    }];

    $scope.productTela = angular.copy(product);
    
    this.editItem = function () {
    $scope.item.form.$setSubmitted();
    if($scope.item.form.$valid) {
      productService.update(product._id, $scope.productTela)
        .then( function() {
          console.log("product: " + $scope.productTela.name + " atualizado!");
          onComplete();
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
        });
    }}
    
    function onComplete() {
        $mdDialog.hide();
    }
  
});