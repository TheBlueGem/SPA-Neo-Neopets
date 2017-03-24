furryModule.service('cartService', function ($rootScope, $cookies, $location, itemService, playerService) {

    this.addToCart = function(id){
        var element = document.getElementById(id);
        var amountInput = element.getElementsByClassName("amount-input")[0]

        var cartItem = {
            id: id,
            amount: amountInput.value
        }

        amountInput.value = "1";

        var cart = $cookies.getObject("cart") || [];
        var alreadyInCart = false;
        cart.forEach(function (item) {
            if (item.id === id) {
                item.amount = (parseInt(item.amount) + parseInt(cartItem.amount)).toString();
                alreadyInCart = true;
            }
        }, this);
        
        if(!alreadyInCart){
            cart.push(cartItem);
        }

        $cookies.putObject("cart", cart);
        $rootScope.$broadcast('cartUpdated');
    }

    this.getCart = function(){
        var cart = $cookies.getObject("cart") || [];
        var current = {};
        cart.total = "0";
        cart.forEach(function(item) {
            current = itemService.getItem(item.id);            
            item.name = current.name;
            item.price = current.price;
            cart.total = (parseInt(cart.total) + parseInt(current.price) * parseInt(item.amount)).toString();
        }, this);
        return cart;
    }
    
    this.removeFromCart = function(id) {
        var cart = $cookies.getObject("cart");
        cart.forEach(function (item) {
            if (item.id === id) {
                cart.splice(cart.indexOf(item), 1);
            }
        }, this);
        $cookies.putObject("cart", cart);
        $rootScope.$broadcast("cartUpdated");
    }    

    this.emptyCart = function(){
        $cookies.put("cart", [])
        $rootScope.$broadcast("cartUpdated");
    }

    this.checkout = function(){
        var currentPlayer = playerService.getCurrentPlayer();
        if(currentPlayer == undefined){
            $location.path("/login");
        }
        else{
            var cart = this.getCart();
            var cartTotal = parseInt(cart.total);
            var credits = parseInt(currentPlayer.credits);
            if(cartTotal < credits){                
                credits -= cartTotal;
            }
            this.emptyCart();
            currentPlayer.credits = credits.toString();
            
            playerService.updatePlayer(currentPlayer);
            playerService.setCurrentPlayer(currentPlayer);
            swal({
                title: "Your checkout was succesful!",
                text: "You have " + credits + " left",
                timer: 2000,
                showConfirmButton: false,
                animation: "slide-from-top",
                customClass: "alert"
            });            
            $rootScope.$broadcast("currentPlayerUpdated");
        }
    }
});