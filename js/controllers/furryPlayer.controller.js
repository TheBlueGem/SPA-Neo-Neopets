furryModule.controller("furryPlayerController", function ($scope, $rootScope, $location, $timeout, $routeParams, playerService, itemService) {
     
    if (playerService.getCurrentPlayer() !== undefined) {
        $scope.currentPlayer = playerService.getCurrentPlayer();
        $scope.currentPlayer.inventory.forEach(function(item) {
            var storageItem = itemService.getItem(item.id);
            item.image = storageItem.image;
        }, this);
    }

    $scope.playerLogin = {
        name: "",
        password: ""
    }

    $scope.players = playerService.getPlayers();

    if ($routeParams.id !== undefined) {
        $timeout(function () {
            $scope.player = $scope.getPlayerById($routeParams.id);
        })
    }

    $scope.getPlayerById = function (id) {
        var tempPlayer = {};
        $timeout(function () {
            $scope.players.forEach(function (player) {
                if (player.id === id) {
                    tempPlayer = player;
                    return;
                }
            }, this);
            return tempPlayer;
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
                    playerService.setCurrentPlayer(player);
                    $rootScope.$broadcast('currentPlayerUpdated');
                    $timeout(function(){
                        $location.path("/");
                    }, 50)                    
                }
            }, this);
        })
    }

});