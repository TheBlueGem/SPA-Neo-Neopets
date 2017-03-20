furryModule.service('itemService', function(){
    this.getItems = function(){
        if(localStorage.getItem('shopItems') != undefined){
        return JSON.parse(localStorage.getItem('shopItems'));
        }
    }

    this.getItem = function(){
        var items = this.getItems();
        var selectedItem = {};

        items.forEach(function(item) {
            if(item.id === itemId){
                selectedItem = item;
            }
        }, this);
        
        return selectedItem;
    }

    this.addItem = function(){
        debugger;
        var items = [];
        items = this.getItems();
        items.push($scope.item);
        localStorage.setItem("shopItems", JSON.stringify(items));
    }
})