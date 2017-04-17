'use strict';

angular.module('xy-inc-app')
  .controller('ProductCtrl', function ($scope, $mdDialog, $filter, $q, $timeout, $window, productService) {
    
    var bookmark;
    
    $scope.filter = {
        options: {
        debounce: 500
        }
    };

    $scope.query = {
        filter: '',
        limit: '5',
        order: 'name',
        page: 1
    };
    
   $scope.pagination = {
        page : 'Página',
        rowsPerPage : 'itens por página',
        of: 'de'      
    };    

    var registros = [];    
    function applyFilter() {
      var data = angular.copy(registros);
      data = $scope.query.order ? $filter('orderBy')(data, $scope.query.order) : data;
      data = $scope.query.filter ? $filter('filter')(data, {name : $scope.query.filter}) : data;      
      $scope.totalRegistros = data.length;      
      data = data.slice(($scope.query.page - 1) * $scope.query.limit, $scope.query.page * $scope.query.limit);
      $scope.products = data;      
    }
    
    function getRegistros() {
        var deferred = $q.defer();
        $scope.promise = deferred.promise;

        productService.getAll()
            .then(function (result) {
                registros = result.data;
                applyFilter(false);
                deferred.resolve();
            }, function (err) {
                err = err.data;
                $scope.errors = {};
                deferred.resolve();
            });
    }
  
    $scope.add = function (product) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'ProductAddCtrl',
            controllerAs: 'ctrl',
            focusOnOpen: false,
            targetEvent: event,            
            templateUrl: 'app/product/dialogs/add-product.html',
        }).then(getRegistros);
    };

    $scope.edit = function (product) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'ProductEditCtrl',
            controllerAs: 'ctrl',
            focusOnOpen: false,
            targetEvent: event,
            locals: { product: product },
            templateUrl: 'app/product/dialogs/edit-product.html',
        }).then(getRegistros);
    };
  
    $scope.delete = function (product) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: 'ProductDelCtrl',
            controllerAs: 'ctrl',
            focusOnOpen: false,
            targetEvent: event,
            locals: { product: product },
            templateUrl: 'app/product/dialogs/del-product.html',
        }).then(getRegistros);
    };
  
    $scope.onPaginate = function (page, limit) {
      applyFilter(angular.extend({}, $scope.query, {page: page, limit: limit}));      
    };

    $scope.onReorder = function (order) {      
       applyFilter(angular.extend({}, $scope.query, {
           order: order
       }));
    };
    
    $scope.setFilter = function () {
      $scope.filter.show = true;

      $timeout(function () {
        var element = $window.document.getElementById('txtFilter');
        if (element)
          element.focus();
      }, 100);
    };
    
    $scope.removeFilter = function () {
        $scope.filter.show = false;
        $scope.query.filter = '';
        
        if($scope.filter.form.$dirty) {
        $scope.filter.form.$setPristine();
        }
    };
    
    $scope.$watch('query.filter', function (newValue, oldValue) {
        if(!oldValue) {
        bookmark = $scope.query.page;
        }
        
        if(newValue !== oldValue) {
        $scope.query.page = 1;
        }
        
        if(!newValue) {
        $scope.query.page = bookmark;
        }
        
        getRegistros();
    });
  });
