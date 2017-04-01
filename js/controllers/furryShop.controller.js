furryModule.controller("furryShopController", function ($scope, $http, cartService, itemService, creatureService, $timeout, $location, $routeParams) {

    $scope.shopItems = getItems();
    $scope.shopCreatures = creatureService.getCreatures();
    $scope.image = "";


    if ($routeParams.id != null) {
        $timeout(function () {
            var editType = document.getElementById("editTypeInput").value;

            if (editType === "item") {
                $scope.object = $scope.getShopItem($routeParams.id);
            }
            else
            {
                $scope.object = $scope.getShopCreature($routeParams.id);
            }

            if ($scope.object.image === "" || $scope.object.image == null) {
                $scope.object.image = "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
            }
        })
    }

    $scope.addToCart = function (object) {
        cartService.addToCart(object);
    }

    function addToShop(type) {
        $scope.object.type = type;
        if (type === "item") {
            itemService.addItem($scope.object);
        }
        else {
            var creature = $scope.object;
            creature.level = "1";
            creatureService.addCreature(creature);
        }
        $scope.object.name = '';
        $scope.object.price = '';
        $scope.object.image = "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        $location.path("/shop/manage")
        console.log("Added");
    }

    $scope.addShopItem = function () {
        addToShop("item");
    }

    $scope.getShopItem = function (id) {
        return itemService.getItem(id);
    }

    function getItems() {
        var items = itemService.getItems();
        for (i = 0; i < items.length; i++) {
            items[i].amount = 1;
        }
        return items;
    }

    $scope.updateShopItem = function () {
        itemService.updateItem($scope.object);
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
        addToShop("creature");
    }

    $scope.getShopCreature = function (id) {
        return creatureService.getCreature(id);
    }

    $scope.updateShopCreature = function () {
        creatureService.updateCreature($scope.object);
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

    $scope.uploadFile = function () {
        var file = event.target.files[0];
        var img = document.getElementsByClassName("upload-image")[0];
        var URL = window.URL || window.webkitURL;
        var srcTmp = URL.createObjectURL(file);
        var reader = new FileReader();

        img.src = srcTmp;

        reader.addEventListener("load", function () {
            $scope.object.image = reader.result;
        });

        reader.readAsDataURL(file);
    }
});