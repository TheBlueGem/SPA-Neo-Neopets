var furryModule = angular.module("furryModule", ['ngRoute']);

furryModule.controller("furryMainController", function($scope, itemService, playerService){ 
    $scope.featuredItems = itemService.getFeaturedItems();

    if($scope.currentPlayer === undefined){
        $scope.currentPlayer = playerService.getCurrentPlayer();
    }
    
    $scope.$on('login', function(){
        $scope.currentPlayer = playerService.getCurrentPlayer();
    });

    $scope.logout = function(){
        playerService.removeCurrentPlayer();
        $scope.currentPlayer = undefined;
    }
    
    console.log("HELP ME")
});




