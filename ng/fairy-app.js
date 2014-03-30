var $fairyApp = angular.module('fairyApp', ['ngRoute', 'firebase']);


// Routing
// ----------------------------------------

//This configures the routes and associates each route with a view and a controller
$fairyApp.config(function ($routeProvider) {
    $routeProvider
        .when('/vouchers',
            {
                controller: 'vouchersController',
                templateUrl: '/ng/templates/vouchers.html'
            })
        .otherwise({ redirectTo: '/vouchers' });
});

// Controllers
// ----------------------------------------


$fairyApp.controller("vouchersController", ["$scope", "$firebase", 
    function($scope, $firebase) {
        var vouchers = new Firebase("https://scorching-fire-7581.firebaseIO.com/vouchers/");
        $scope.vouchers = $firebase(vouchers);
        
        var partners = new Firebase("https://scorching-fire-7581.firebaseIO.com/partners/");
        $scope.partners = $firebase(partners);
    }
]);

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