furryModule.service('cartService', function (playerService) {
  this.addItemToInventory = function(item){
      var currentPlayer = playerService.getCurrentPlayer();
      var alreadyInInventory = false;

      currentPlayer.inventory.forEach(function(currentItem) {
          if(currentItem.id === item.id){
              item.amount = (parseInt(currentItem.amount) + parseInt(item.amount)).toString();
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
              item = currentItem;
          }
      }, this);

      return item;
  }
});