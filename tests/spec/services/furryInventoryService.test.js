describe("inventoryService unit tests", function () {

    var service;
    var testItem;
    var testCreature;
    var testInventoryItem;
    var currentPlayer;
    var storageResult;

    beforeEach(function () {
        module('furryModule');
        inject(function (inventoryService) {
            service = inventoryService;
        });

        testItem = {
            id: 1,
            type: "item",
            name: "Butt-o-ham",
            price: 20,
            image: "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }

        testCreature = {
            id: 2,
            type: "creature",
            name: "Snap-er-meat",
            price: 50,
            image: "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }

        testPlayer = {
            id: 1,
            name: "Furry Henk",
            dateJoined: "24-07-2010",
            credits: "1000",
            inventory: []
        }

        testInventoryItem = {
            id: 1,
            amount: 5
        }



    });

    it("should add the item to the player's inventory", function () {
        localStorage.setItem("currentPlayer", JSON.stringify([testPlayer]));
        currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"))[0];
        expect(currentPlayer).not.toBeNull(null);

        service.addItemToInventory(testItem, currentPlayer);

        expect(currentPlayer.inventory.length).toEqual(1);

    });

    it("should get the player's inventory", function () {
        testPlayer.inventory.push(testInventoryItem);
        testPlayer.inventory.push(testCreature.id);
        localStorage.setItem("currentPlayer", JSON.stringify([testPlayer]));
        localStorage.setItem("shopItems", JSON.stringify([testItem]));
        localStorage.setItem("shopCreatures", JSON.stringify([testCreature]));

        currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"))[0];
        expect(currentPlayer).not.toBeNull(null);
        storageResult = JSON.parse(localStorage.getItem("shopItems"));
        expect(storageResult).not.toBeNull(null);
        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));
        expect(storageResult).not.toBeNull(null);


        currentPlayer.inventory = service.getInventory(currentPlayer);

        var equalToItem = true;
        var keys = Object.keys(testItem);
        
        keys.forEach(function (key) {
            if (currentPlayer.inventory[0][key] !== testItem[key]) {
                equalToStorage = false;
            }
        }, this);
        expect(equalToItem).toBeTruthy();

        var equalToCreature = true;
        var keys = Object.keys(testCreature);
        keys.forEach(function (key) {
            if (currentPlayer.inventory[1][key] !== testCreature[key]) {
                equalToStorage = false;
            }
        }, this);
        expect(equalToCreature).toBeTruthy();
    });
        


});

