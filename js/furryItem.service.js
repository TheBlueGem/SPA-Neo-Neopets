furryModule.service('itemService', function($scope){
    $scope.getItems = function(){
        return JSON.parse(localStorage.getItem('shopItems'));
    }

    $scope.getItem = function(itemId){
        var items = getItems();
        var selectedItem = {};

        items.forEach(function(item) {
            if(item.id === itemId){
                selectedItem = item;
            }
        }, this);
        
        return selectedItem;
    }

    $scope.addItem = function(item){
        var items = [];
        localStorage.getItems();
        items.push(item);
        localStorage.setItem("shopItems", JSON.stringify(items));
    }
})