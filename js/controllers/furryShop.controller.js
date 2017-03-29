furryModule.controller("furryShopController", function ($scope, $http, cartService, itemService, creatureService, $timeout, $location, $routeParams) {

    $scope.shopItems = itemService.getItems();
    $scope.shopCreatures = creatureService.getCreatures();
    $scope.image = "";
    $scope.editType = "";

    $timeout(function () {
        $scope.item = $scope.getShopItem($routeParams.id);
        $scope.item.type = "item";
        if ($scope.item.image === "" || $scope.item.image == null) {
            $scope.item.image = "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }
    })

    $timeout(function () {
        $scope.creature = $scope.getShopCreature($routeParams.id);
        $scope.creature.type = "creature";
        if ($scope.creature.image === "" || $scope.creature.image == null) {
            $scope.creature.image = "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }
    })

    $scope.setEditType = function (object) {
        $scope.editType = object.type;
    }

    $scope.addToCart = function (object) {
        cartService.addToCart(object);
    }

    $scope.addShopItem = function () {
        $scope.item.type = "item";
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

    $scope.addShopCreature = function () {
        $scope.item.type = "creature";
        creatureService.addCreature($scope.creature);
        $scope.creature.name = '';
        $scope.creature.price = '';
        $scope.creature.image = "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        $location.path("/shop/manage")
        console.log("Added");
    }

    $scope.getShopCreature = function (id) {
        return creatureService.getCreature(id);
    }

    $scope.updateShopCreature = function () {
        creatureService.updateCreature($scope.creature);
        $location.path("/shop/manage");
        console.log("Edited");
    }

    $scope.removeShopCreature = function (id) {
        creatureService.removeCreature(id);
        $scope.shopCreature = creatureService.getCreature();
    }

    $scope.hideShopCreature = function (id) {
        creatureService.hideCreature(id);
        $scope.shopcreatures = creatureService.getCreatures();
    }

    $scope.previewFile = function () {
        var file = event.target.files[0];
        var img = document.getElementsByClassName("upload-image")[0];
        var URL = window.URL || window.webkitURL;
        var srcTmp = URL.createObjectURL(file);
        var reader = new FileReader();

        img.src = srcTmp;

        reader.addEventListener("load", function () {
            if($scope.editType === "item"){
                $scope.item.image = reader.result;
            }
            else
            {
                $scope.creature.image = reader.result;
            }            
        });

        reader.readAsDataURL(file);
    }
});