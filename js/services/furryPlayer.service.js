furryModule.service('playerService', function (storageService) {
    var key = "players";

    this.setCurrentPlayer = function (player) {
        localStorage.setItem("currentPlayer", JSON.stringify(player));
    }

    this.removeCurrentPlayer = function () {
        localStorage.removeItem("currentPlayer");
    }

    this.addPlayer = function(player) {
        player.cash = "1000";
        storageService.saveToStorage(key, player);
    }

    this.getPlayers = function(){
        var players = storageService.getFromStorage(key);
        if(players == undefined){
            players = [];
        }
        return players;
    }

    this.getCurrentPlayer = function(){
        return JSON.parse(localStorage.getItem("currentPlayer"));
    }

    this.updatePlayer = function(player){
        this.setCurrentPlayer(player);
        storageService.updateStorage(key, player.id, player);
    }
});