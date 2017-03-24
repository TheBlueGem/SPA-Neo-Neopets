furryModule.service('inventoryService', function (playerService, itemService) {
  this.addItemToInventory = function(item, currentPlayer){
      var alreadyInInventory = false;

      if(currentPlayer.inventory == null){
          currentPlayer.inventory = [];
      }

      currentPlayer.inventory.forEach(function(currentItem) {
          if(currentItem.id === item.id){
              currentItem.amount = (parseInt(currentItem.amount) + parseInt(item.amount)).toString();
              alreadyInInventory = true;
          }
      }, this);

      if(!alreadyInInventory){
        currentPlayer.inventory.push(item);
      }
  }

  this.getItemFromInventory = function(id){
      var currentPlayer = playerService.getCurrentPlayer();
      var item = null;

      currentPlayer.inventory.forEach(function(currentItem) {
          if(currentItem.id === id){
              item = itemService.getItem(id);
              item.amount = currentItem.amount;
          }
      }, this);

      return item;
  }
});