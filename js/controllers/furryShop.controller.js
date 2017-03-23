furryModule.controller("furryShopController", function ($rootScope, $scope, storageService, itemService, $timeout, $location, $routeParams) {

    $scope.shopItems = itemService.getItems();

    $timeout(function () {
        $scope.item = $scope.getShopItem($routeParams.id);
    })

    $scope.addToCart = function (id) {
        var element = document.getElementById(id);

        var cartItem = {
            id: id,
            amount: element.getElementsByClassName("amount-input")[0].value
        }

        var cart = storageService.getFromStorage("cart");

        var alreadyInCart = false;
        cart.forEach(function (item) {
            if (item.id === id) {
                cartItem.amount = (parseInt(item.amount) + parseInt(cartItem.amount)).toString();
                alreadyInCart = true;
            }
        }, this);

        if (alreadyInCart) {
            storageService.updateStorage("cart", cartItem.id, cartItem);
        }
        else {
            storageService.saveToStorage("cart", cartItem, true);
        }
        $rootScope.$broadcast('cartUpdated');
    }

    $scope.removeFromCart = function (id) {
        storageService.removeFromStorage("cart", id);
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
        $scope.shopItems = itemService.getShopItems();
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