var furryModule = angular.module("furryModule", ['ngRoute', 'ngCookies', 'ngAnimate', 'simpleButtonGame']);

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

    $scope.$on('countCredits', function(event, scoreObject){
        var creditsWon = scoreObject.score * scoreObject.difficulty / 10; 
        $scope.currentPlayer.credits = (parseInt($scope.currentPlayer.credits) + creditsWon).toString();
        playerService.updatePlayer($scope.currentPlayer);
        playerService.setCurrentPlayer($scope.currentPlayer);

        swal({
                title: "",
                text: "You won " + creditsWon + " credits in that game!\nYour total is now " + $scope.currentPlayer.credits,
                timer: 4000,
                showConfirmButton: false,
                animation: "slide-from-top",
                customClass: "alert"
            });    
    })

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




