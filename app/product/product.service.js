'use strict';

angular.module('xy-inc-app')
  .service('productService', function ($http) {

    var host = 'http://localhost:9000/products'

    this.getAll = function(){
        return $http.get(host);
    }

    this.add = function(product){
        return $http.post(host,product);
    }

    this.update = function(id,product){
        return $http.put(host+ "/" + id,product);
    }

    this.delete = function(id){
        return $http.delete(host+ "/" + id);
    }
    
  });
   

