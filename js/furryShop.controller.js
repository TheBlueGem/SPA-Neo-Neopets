furryModule.controller("furryShopController", function ($scope, storageService, $timeout, $location, $routeParams) {
    var key = "shopItems";
    var dropzone = new dropzone("div#item-dropzone", { url: "file/post" })
    $scope.shopItems = storageService.getFromStorage(key);

    $timeout(function () {
        $scope.item = $scope.getShopItem($routeParams.id);
    })


    $scope.addShopItem = function () {
        storageService.saveToStorage(key, $scope.item);
        $scope.item.name = '';
        $scope.item.price = '';
        $location.path("/shop/manage")
        console.log("Added");
    }

    $scope.getShopItem = function (id) {
        $timeout(function () {
            $scope.shopItems.forEach(function (item) {
                if (item.id === id) {
                    $scope.item = item;
                }
            }, this);
        })

    }

    $scope.editShopItem = function () {
        storageService.updateStorage(key, $scope.item.id, $scope.item);
        $location.path("/shop/manage");
        console.log("Edited");
    }

    $scope.removeShopItem = function (id) {
        storageService.removeFromStorage(key, id);
        $scope.shopItems = storageService.getFromStorage(key);
    }
});