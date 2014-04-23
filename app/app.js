'use strict';

angular.module("fairyApp", [
  'ngRoute',
  'menu',
  'expenses',
  'incomes',
  'dashboard'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/expenses', {
      templateUrl: 'expenses/expenses.html',
      controller: 'ExpensesController'
    })
    .when('/incomes', {
      templateUrl: 'incomes/incomes.html',
      controller: 'IncomesController'
    })
    .otherwise({
      redirectTo: '/dashboard'
    })
  ;
}]);
