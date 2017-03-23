var furryModule = angular.module("furryModule", ['ngRoute']);

furryModule.controller("furryMainController", function ($scope, itemService, playerService, storageService) {
    $scope.featuredItems = itemService.getFeaturedItems();
    $scope.currentPlayer = playerService.getCurrentPlayer();
    $scope.cart = storageService.getFromStorage("cart");

    $scope.$on('cartUpdated', function () {
        $scope.cart = storageService.getFromStorage("cart");
    })

    $scope.$on('login', function () {
        $scope.currentPlayer = playerService.getCurrentPlayer();
    });

    $scope.logout = function () {
        playerService.removeCurrentPlayer();
        $scope.currentPlayer = undefined;
    }

    console.log("HELP ME")
});




