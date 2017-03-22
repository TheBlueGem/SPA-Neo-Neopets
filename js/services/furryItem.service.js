furryModule.service('itemService', function(storageService){
    
    this.getItems = function(){
        return storageService.getFromStorage("shopItems");
    }

    this.getItem = function(id){
        var items = this.getItems();
        var selectedItem = {};

        items.forEach(function(item) {
            if(item.id === id){
                selectedItem = item;
                return;
            }
        }, this);
        
        return selectedItem;
    }

    this.addItem = function(item){
        storageService.saveToStorage("shopItems", item);
    }

    this.updateItem = function(item){
        storageService.updateStorage("shopItems", item.id, item);
    }

    this.removeItem = function(id){
        storageService.removeFromStorage("shopItems", id);
    }

     this.getFeaturedItems = function(){
         var featuredItems = [];
         var items = this.getItems();

         items.forEach(function(item){
            if(item.featured){
                featuredItems.push(item);
            }
         }, this)

        return featuredItems;
    }

    this.featureItem = function(id){
        var item = this.getItem(id);
        item.featured = true;
        this.updateItem(item)
    }

    this.unfeatureItem = function(id){
        var item = this.getItem(id);
        item.featured = false;
        this.updateItem(item)
    }
    
})