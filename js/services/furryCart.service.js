furryModule.service('cartService', function ($rootScope, $cookies, $location, itemService, playerService, inventoryService) {

    this.addToCart = function (object) {
        var element = document.getElementsByClassName(object.type).getElementById(object.id);
        var amountInput = element.getElementsByClassName("amount-input")[0]

        var cartItem = {
            type: object.type,
            id: object.id,
            amount: amountInput.value
        }

        amountInput.value = "1";

        var cart = $cookies.getObject("cart") || [];
        var alreadyInCart = false;
        cart.forEach(function (cartobject) {
            if (cartobject.type === object.type && cartobject.id === object.id) {
                object.amount = (parseInt(object.amount) + parseInt(cartItem.amount)).toString();
                alreadyInCart = true;
            }
        }, this);

        if (!alreadyInCart) {
            cart.push(cartItem);
        }

        $cookies.putObject("cart", cart);
        $rootScope.$broadcast('cartUpdated');
    }

    this.getCart = function () {
        var cart = $cookies.getObject("cart") || [];
        var current = {};
        cart.total = "0";
        cart.forEach(function (object) {
            if (object.type === "item") {
                current = itemService.getItem(object.id);
                object.name = current.name;
                object.price = current.price;
                cart.total = (parseInt(cart.total) + parseInt(current.price) * parseInt(object.amount)).toString();
            }
            else {
                current = creatureService.getCreature(object.id);
                object.name = current.name;
                object.price = current.price;
                cart.total = (parseInt(cart.total) + parseInt(current.price) * parseInt(object.amount)).toString();
            }
        }, this);
        return cart;
    }

    this.removeFromCart = function (type, id) {
        var cart = $cookies.getObject("cart");
        cart.forEach(function (object) {
            if (object.type = type && object.id === id) {
                cart.splice(cart.indexOf(object), 1);
            }
        }, this);
        $cookies.putObject("cart", cart);
        $rootScope.$broadcast("cartUpdated");
    }

    this.emptyCart = function () {
        $cookies.put("cart", [])
        $rootScope.$broadcast("cartUpdated");
    }

    this.checkout = function () {
        var currentPlayer = playerService.getCurrentPlayer();
        if (currentPlayer == undefined) {
            $location.path("/login");
        }
        else {
            var cart = this.getCart();
            var cartTotal = parseInt(cart.total);
            var credits = parseInt(currentPlayer.credits);
            if (cartTotal < credits) {
                credits -= cartTotal;
            }
            this.emptyCart();
            currentPlayer.credits = credits.toString();

            cart.forEach(function (item) {
                inventoryService.addItemToInventory(item, currentPlayer);
            }, this);

            swal({
                title: "Your checkout was successful!",
                text: "You have " + credits + " left",
                timer: 2000,
                showConfirmButton: false,
                animation: "slide-from-top",
                customClass: "alert"
            });

            playerService.updatePlayer(currentPlayer);
            playerService.setCurrentPlayer(currentPlayer);
            $rootScope.$broadcast("currentPlayerUpdated");
        }
    }
});