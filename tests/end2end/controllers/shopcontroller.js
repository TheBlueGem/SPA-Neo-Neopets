describe("Test the shop", function(){

    beforeEach(function(){
        browser.get("http://localhost:8080/#/");
    });

    it("should edit an item in the shop", function(){
        var item = {
            name: "snoepje",
            price: "25"
        }
        element(by.css("a.shop")).click()
    });
})