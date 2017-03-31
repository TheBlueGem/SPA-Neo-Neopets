furryModule.service('inventoryService', function (itemService, creatureService) {
    this.addItemToInventory = function (item, currentPlayer) {
        var alreadyInInventory = false;

        var inventoryItem = {
            type: item.type,
            id: item.id,
            amount: item.amount
        }

        if (currentPlayer.inventory === null) {
            currentPlayer.inventory = [];
        }

        if (inventoryItem.type === "item") {
            currentPlayer.inventory.forEach(function (currentItem) {
                if (currentItem.type === inventoryItem.type && currentItem.id === inventoryItem.id) {
                    currentItem.amount = (parseInt(currentItem.amount) + parseInt(inventoryItem.amount)).toString();
                    alreadyInInventory = true;
                }
            }, this);
        }

        if (!alreadyInInventory) {
            currentPlayer.inventory.push(inventoryItem);
        }
    }

    this.getInventory = function (player) {
        var amount = "";
        var inventory = [];

        player.inventory.forEach(function (currentItem) {
            if (currentItem.type === "item") {
                amount = currentItem.amount;
                currentItem = itemService.getItem(currentItem.id);
                currentItem.amount = amount;
            }
            else {
                currentItem = creatureService.getCreature(currentItem.id);
            }

            inventory.push(currentItem);

        }, this);

        return inventory;
    }
});