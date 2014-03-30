var $fairyApp = angular.module('fairyApp', ['ngRoute', 'firebase']);


// Routing
// ----------------------------------------

//This configures the routes and associates each route with a view and a controller
$fairyApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
            {
                controller: 'testController',
                templateUrl: '/ng/templates/test.html'
            })
        .otherwise({ redirectTo: '/home' });
});

// Controllers
// ----------------------------------------

$fairyApp.controller("testController", ["$scope", "$firebase", 
    function($scope, $firebase) {
        var ref = new Firebase("https://scorching-fire-7581.firebaseIO.com/");
        $scope.comments = $firebase(ref);
        $scope.username = 'Guest' + Math.floor(Math.random() * 101);
        
        $scope.addComment = function(e) {
            if(e.keyCode != 13) {
                return;
            }
            
            $scope.comments.$add({
                from: $scope.username,
                body: $scope.newComment
            });
            
            $scope.newComment = "";
            e.preventDefault();
        }
    }
]);