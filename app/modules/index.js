module.exports = angular.module('foosApp.modules', [
	require('./users').name,
	require('./leagues').name,
	require('./tournaments').name,
	require('./leagues').name,
	require('./competitions').name,
	require('./teams').name,
])
.controller('MainCtrl', require('./MainCtrl'))