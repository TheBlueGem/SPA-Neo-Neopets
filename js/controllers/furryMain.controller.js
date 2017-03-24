var furryModule = angular.module("furryModule", ['ngRoute', 'ngCookies', 'ngAnimate']);

furryModule.controller("furryMainController", function ($scope, cartService, itemService, playerService, storageService) {
    $scope.featuredItems = itemService.getFeaturedItems();
    $scope.currentPlayer = playerService.getCurrentPlayer();
    $scope.cart = cartService.getCart();

    $scope.$on('cartUpdated', function () {
        $scope.cart = cartService.getCart();
    })

    $scope.$on('currentPlayerUpdated', function () {
        $scope.currentPlayer = playerService.getCurrentPlayer();
    });

    $scope.removeFromCart = function(id){
        cartService.removeFromCart(id);
    }

    $scope.logout = function () {
        playerService.removeCurrentPlayer();
        $scope.currentPlayer = undefined;
    }

    $scope.checkout = function(){
        cartService.checkout();
    }

    console.log("HELP ME")
});




