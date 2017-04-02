describe("creatureService unit tests", function () {

    var service;
    var testCreature;
    var storageResult

    beforeEach(function () {
        module('furryModule');
        inject(function (creatureService) {
            service = creatureService;
        })

        testCreature = {
            id: 1,
            name: "Butt-er-fly",
            price: 2000,
            image: "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200",
            level: "1"
        }
    });

    it('should add a new creature in the Local Storage', function () {
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

        localStorage.setItem("shopCreatures", JSON.stringify([testCreature]));
        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));        
        expect(storageResult.length).toEqual(1);

        testCreature.name = "Butthurt fly";
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

    it('should remove the creature in the Local Storage', function () {
        localStorage.setItem("shopCreatures", JSON.stringify([testCreature]));
        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));
        expect(storageResult.length).toEqual(1);

        service.removeCreature(1);
        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));
        expect(storageResult.length).toEqual(0);

    });

      it('should set the creature to hidden in the Local Storage', function () {
        localStorage.setItem("shopCreatures", JSON.stringify([testCreature]));
        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));
        expect(storageResult.length).toEqual(1);

        service.hideCreature(1);
        storageResult = JSON.parse(localStorage.getItem("shopCreatures"));
        expect(storageResult[0].hidden).toBeTruthy();
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
