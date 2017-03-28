furryModule.controller("furryShopController", function ($scope, $http, cartService, itemService, $timeout, $location, $routeParams) {

    $scope.shopItems = itemService.getItems();
    $scope.image = "";

    $timeout(function () {
        $scope.item = $scope.getShopItem($routeParams.id);
        if($scope.item.image === "" || $scope.item.image == null){
            $scope.item.image = "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }
    })

    $scope.addToCart = function (id) {
        cartService.addToCart(id);
    }

    $scope.addShopItem = function () {
        itemService.addItem($scope.item);
        $scope.item.name = '';
        $scope.item.price = '';
        $scope.item.image = "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
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

    $scope.hideShopItem = function (id) {
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

    $scope.previewFile = function () {
        var file = event.target.files[0];
        var img = document.getElementsByClassName("item-image")[0];
        var URL = window.URL || window.webkitURL;
        var srcTmp = URL.createObjectURL(file);
        var reader = new FileReader();

        img.src = srcTmp;

        reader.addEventListener("load", function(){
            $scope.item.image = reader.result;
        });

        reader.readAsDataURL(file);
    }
});