furryModule.factory('cartFactory', function (storageService, itemService) {
    function getCart(){
        var cart = storageService.getFromStorage("cart");
        var current = {};
        cart.forEach(function(item) {
            current = itemService.getItem(item.id);            
            item.name = current.name;
            cart.total = (parseInt(cart.total) + parseInt(current.price) * parseInt(item.amount)).toString();
        }, this);
    }
    
    return{
        cart: getCart()
    }    
});