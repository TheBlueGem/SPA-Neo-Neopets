var simpleButtonGame = angular.module("simpleButtonGame", []);

simpleButtonGame.controller("simpleButtonController", function ($scope, $interval, $rootScope) {
    $scope.buttons = [];
    $scope.button = {};
    $scope.score = 0;

    var started = false;
    var difficulty = 8;

    for (i = difficulty - 1; i >= 0; i--) {
        $scope.button = {
            class: "inactive",
            value: "Click?",
            id: i
        }
        $scope.buttons.push($scope.button);
    }

    var delay = 1000;
    var selectedButton = {
        id: -1
    };

    var lastSelected = {
        id: -2
    };

    var selectedId = -1;

    $interval(function () {

        if (started) {
            lastSelected = selectedButton;
            while (selectedId === lastSelected.id) {
                selectedId = Math.floor(Math.random() * $scope.buttons.length);
            }
            for (i = 0; i < $scope.buttons.length; i++) {
                if (selectedId === $scope.buttons[i].id) {
                    $scope.buttons[i].class = "active";
                    $scope.buttons[i].value = "Click!";
                    selectedButton = $scope.buttons[i];
                }
                else {
                    $scope.buttons[i].class = "inactive";
                    $scope.buttons[i].value = "Click?";
                }
            }
        }
    }, delay);


    $scope.clicked = function (button) {
        if (button.class === "active") {
            $scope.score += 10;
            button.class = "inactive";
        }
    }

    $scope.startGame = function () {
        started = true;
    }

    $scope.stopGame = function () {
        $rootScope.$broadcast("countCredits", { score: $scope.score, difficulty: difficulty })        
        $scope.resetGame();
    }

    $scope.resetGame = function () {
        started = false;
        $scope.score = 0;
        resetButtons();
    }

    resetButtons = function () {
        for (i = 0; i < $scope.buttons.length; i++) {
            $scope.buttons[i].class = "inactive";
            $scope.buttons[i].value = "Click?";
        }
    }
});