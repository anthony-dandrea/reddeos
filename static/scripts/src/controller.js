angular.module('reddeo').controller('FooController', ['$scope', function($scope){
  console.log('angular controller should work, check view binding');
  $scope.foo = 'hi';
}]);
