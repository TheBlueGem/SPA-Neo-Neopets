furryModule.service('playerService', function (storageService, inventoryService) {

    this.setCurrentPlayer = function (player) {
        localStorage.setItem("currentPlayer", JSON.stringify(player));
    }

    this.removeCurrentPlayer = function () {
        localStorage.removeItem("currentPlayer");
    }

    this.addPlayer = function (player) {
        player.credits = "1000";
        player.inventory = [];
        storageService.saveToStorage("players", player);
    }

    this.getPlayers = function () {
        var players = storageService.getFromStorage("players");
        if (players == undefined) {
            players = [];
        }
        return players;
    }

    this.getCurrentPlayer = function () {
        return JSON.parse(localStorage.getItem("currentPlayer"));
    }

    this.getPlayer = function (id, withInventory) {
        if(withInventory == null){
            withInventory = false;
        }
        var players = storageService.getFromStorage("players");
        var player = null;
        players.forEach(function (current) {
            if (current.id === id) {
                player = current;
            }
        }, this);
        player.inventory = inventoryService.getInventory(player);
        return player;
    }

    this.getPlayerWithInventory = function(id){
        return this.getPlayer(id, true);
    }

    this.updatePlayer = function (player, profileEdit) {
         if(profileEdit == null){
            profileEdit = false;
        }
        if (profileEdit) {
            this.setCurrentPlayer(player);
        }

        storageService.updateStorage("players", player.id, player);
    }
});