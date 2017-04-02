describe("itemService unit tests", function () {

    var service;
    var testItem;
    var storageResult;


    beforeEach(function () {
        module('furryModule');
        inject(function (itemService) {
            service = itemService;
        })

        testItem = {
            id: 1,
            name: "Butt-o-ham",
            price: 20,
            image: "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }

        testItem2 = {
            id: 2,
            name: "Snap-er-meat",
            price: 50,
            image: "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }

    });

    it('should get the item with the specified id', function () {
        var items = [];
        items.push(testItem);
        items.push(testItem2);
        localStorage.setItem("shopItems", JSON.stringify(items));

        storageResult = JSON.parse(localStorage.getItem("shopItems"));
        expect(storageResult.length).toEqual(2);

        storageResult = service.getItem(2);

        var equalToStorage = true;
        var keys = Object.keys(storageResult);
        keys.forEach(function (key) {
            if (storageResult[key] !== testItem2[key]) {
                equalToStorage = false;
            }
        }, this);

        expect(equalToStorage).toBeTruthy();
    });

    it('should get all items', function () {
        var items = [];
        items.push(testItem);
        items.push(testItem2);
        localStorage.setItem("shopItems", JSON.stringify(items));
        storageResult = JSON.parse(localStorage.getItem("shopItems"));
        expect(storageResult.length).toEqual(2);

        storageResult = service.getItems();
        expect(storageResult.length).toEqual(2);
    });


    it('should feature the item', function () {
        localStorage.setItem("shopItems", JSON.stringify([testItem]));
        storageResult = JSON.parse(localStorage.getItem("shopItems"));
        expect(storageResult.length).toEqual(1);

        var featured = false;
        service.featureItem(1);
        storageResult = JSON.parse(localStorage.getItem("shopItems"));

        storageResult.forEach(function (object) {
            if (object.id === testItem.id) {
                featured = object.featured;
            }
        }, this);

        expect(featured).toBeTruthy();
    });

    it('should get all featured items', function () {
        var items = [];
        testItem.featured = true;
        testItem2.featured = true;
        items.push(testItem);
        items.push(testItem2);
        localStorage.setItem("shopItems", JSON.stringify(items));

        storageResult = JSON.parse(localStorage.getItem("shopItems"));
        expect(storageResult.length).toEqual(2);

        storageResult = service.getFeaturedItems();
        expect(storageResult.length).toEqual(2);
    })
})