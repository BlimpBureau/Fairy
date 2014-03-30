angular.module("fairyApp", ["firebase"]).controller("testController", ["$scope", "$firebase", 
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