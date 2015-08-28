angular.module('reddeo', []);
angular.module('reddeo').config(['$interpolateProvider', function($interpolateProvider) {
	console.log('angular config works');
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
}]);