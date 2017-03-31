furryModule.controller("furryPlayerController", function ($scope, $rootScope, $location, $timeout, $routeParams, playerService, inventoryService) {
     
    if (playerService.getCurrentPlayer() !== null) {
        $scope.currentPlayer = playerService.getCurrentPlayer();
    }

    $scope.playerLogin = {
        name: "",
        password: ""
    }

    $scope.players = playerService.getPlayers();    

    if ($routeParams.id !== undefined) {
        $timeout(function () {
            $scope.player = playerService.getPlayer($routeParams.id);
        })
    }

    $scope.updatePlayer = function () {
        $scope.players.forEach(function(player){
            if(player.id === $scope.currentPlayer.id){
                player = $scope.currentPlayer;
            }
        });

        playerService.updatePlayer($scope.currentPlayer, true);
        $location.path("/player/" + $scope.currentPlayer.id)
    }

    $scope.register = function () {
        playerService.addPlayer($scope.playerLogin);
        $scope.playerLogin = {
            name: "",
            dateJoined: "",
            password: ""
        }
        $location.path("/login")
    }

    $scope.login = function () {
        $timeout(function () {
            $scope.players.forEach(function (player) {
                if (player.name === $scope.playerLogin.name && player.password === $scope.playerLogin.password) {
                    var fullPlayer = playerService.getPlayerWithInventory(player.id);
                    playerService.setCurrentPlayer(fullPlayer);
                    $rootScope.$broadcast('currentPlayerUpdated');
                    $timeout(function(){
                        $location.path("/");
                    }, 50)                    
                }
            }, this);
        })
    }

});