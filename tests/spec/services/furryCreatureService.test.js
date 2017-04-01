describe("creatureService unit tests", function () {

    var service;
    var testCreature;
    var storageResult

    beforeEach(function () {
        module('furryModule');
        inject(function (creatureService) {
            service = creatureService;
        })
    });

    it('should add a new creature in the Local Storage', function () {
        testCreature = {
            name: "Butt-er-fly",
            price: 2000,
            image: "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200",
            level: "1"
        }

        service.addCreature(testCreature);

        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));
        var creatureStored = false;
        expect(storageResult).not.toBeNull(null);

        storageResult.forEach(function (object) {
            if (object.name === testCreature.name) {
                creatureStored = true;
            }
        }, this);
        expect(creatureStored).toBeTruthy();
    });

    it('should update the creature in the Local Storage', function () {
        var newName = "Butthurt fly";

        debugger;
        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));
        testCreature = storageResult[0];

        testCreature.name = newName;

        service.updateCreature(testCreature);

        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));

        var creatureUpdated = false;

        storageResult.forEach(function(object){
            if(object.name === testCreature.name){
                creatureUpdated = true;
            }
        }, this);

        expect(creatureUpdated).toBeTruthy();
    });

    afterEach(function () {
        storageResult.forEach(function (object) {
            if (object.name === testCreature.name) {
                storageResult.splice(storageResult.indexOf(object), 1);
                localStorage.setItem("shopCreatures", JSON.stringify(storageResult));
            }
        }, this);
    })

});
