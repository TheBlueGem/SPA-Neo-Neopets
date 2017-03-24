furryModule.controller("furryShopController", function ($scope, cartService, itemService, $timeout, $location, $routeParams) {

    $scope.shopItems = itemService.getItems();

    $timeout(function () {
        $scope.item = $scope.getShopItem($routeParams.id);
    })

    $scope.addToCart = function (id) {
        cartService.addToCart(id);
    }

    $scope.addShopItem = function () {
        itemService.addItem($scope.item);
        $scope.item.name = '';
        $scope.item.price = '';
        $location.path("/shop/manage")
        console.log("Added");
    }

    $scope.getShopItem = function (id) {
        return itemService.getItem(id);
    }

    $scope.updateShopItem = function () {
        itemService.updateItem($scope.item);
        $location.path("/shop/manage");
        console.log("Edited");
    }

    $scope.removeShopItem = function (id) {
        itemService.removeItem(id);
        $scope.shopItems = itemService.getItems();
    }

    $scope.hideShopItem = function(id){
        itemService.hideItem(id);       
        $scope.shopItems = itemService.getItems();
    }

    $scope.getFeaturedItems = function () {
        return itemsService.getFeaturedItems();
    }

    $scope.getFeaturedItem = function (id) {
        return itemService.getFeaturedItem(id);
    }

    $scope.featureItem = function (item) {
        itemService.featureItem(item.id);
        $scope.shopItems = itemService.getItems();
    }

    $scope.unfeatureItem = function (item) {
        itemService.unfeatureItem(item.id);
        $scope.shopItems = itemService.getItems();
    }
});