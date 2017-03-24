furryModule.service('playerService', function (storageService) {
 
    this.setCurrentPlayer = function (player) {
        localStorage.setItem("currentPlayer", JSON.stringify(player));
    }

    this.removeCurrentPlayer = function () {
        localStorage.removeItem("currentPlayer");
    }

    this.addPlayer = function(player) {
        player.credits = "1000";
        storageService.saveToStorage("players", player);
    }

    this.getPlayers = function(){
        var players = storageService.getFromStorage("players");
        if(players == undefined){
            players = [];
        }
        return players;
    }

    this.getCurrentPlayer = function(){
        return JSON.parse(localStorage.getItem("currentPlayer"));
    }

    this.getPlayer = function(id){
        var players = storageService.getFromStorage("players");
        var player = null;
        players.forEach(function(current) {
            if(current.id === id){
                player = current;
            }
        }, this);
        return player;
    }

    this.updatePlayer = function(player){
        this.setCurrentPlayer(player);
        storageService.updateStorage("players", player.id, player);
    }
});