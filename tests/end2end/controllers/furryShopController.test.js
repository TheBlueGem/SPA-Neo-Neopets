describe("Test the shop End to End", function () {

    var testItem;

    beforeEach(function () {
        browser.get("http://localhost:8080/#/shop/manage")

        testItem = {
            name: "Butt-o-ham",
            price: "20",
            image: "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97200&w=200&h=200"
        }
    });

    it("should add an item to the shop", function () {

        element(by.css('a[href="#/shop/add-item"]')).click();
        var ele = element(by.model("object.name"));
        ele.sendKeys(testItem.name);
        ele = element(by.model("object.price"));
        ele.sendKeys(testItem.price);
        ele = element(by.css(".upload-image"));
        ele.src = testItem.image;
        element(by.css(".button")).click();
        expect(element.all(by.repeater('item in shopItems')).count()).toEqual(1);
    });

    it("should hide the item from the shop", function () {
        element(by.css('a[href="#/shop/add-item"]')).click();
        var ele = element(by.model("object.name"));
        ele.sendKeys(testItem.name);
        ele = element(by.model("object.price"));
        ele.sendKeys(testItem.price);
        ele = element(by.css(".upload-image"));
        ele.src = testItem.image;
        element(by.css(".button")).click();
        ele = element(by.css(".button"));

        var els = element.all(by.css(".link"));
        expect(els.length).not.toEqual(0);
        for (i = 0; i < els.length; i++) {
            if (els[i].textContent === "Hide") {
                els[i].click();
            }
        }

        els = element.all(by.css(".link"));

        var isHidden = true;
        var isShown = false;

         for (i = 0; i < els.length; i++) {
            if(els[i].textContent === "Hide"){
                isHidden = false;
            }
            
            if(els[i].textContent === "Show"){
                isShown = true;
            }
        }

        
        expect(isHidden).toBeTruthy();
        expect(isShown).not.toBeTruthy();
    })
})