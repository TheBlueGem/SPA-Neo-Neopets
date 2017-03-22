furryModule.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'furryMainController'
        })

        .when("/about", {
            templateUrl: 'pages/about.html',
            controller: 'furryAboutController'
        })

        .when("/login", {
            templateUrl: 'pages/player/login.html',
            controller: 'furryPlayerController'
        })

        .when("/register", {
            templateUrl: 'pages/player/register.html',
            controller: 'furryPlayerController'
        })

        .when("/player/:id", {
            templateUrl: 'pages/player/player-profile.html',
            controller: 'furryPlayerController'
        })

        .when("/player/edit/:id", {
            templateUrl: 'pages/player/edit-profile.html',
            controller: 'furryPlayerController'
        })

        .when("/shop", {
            templateUrl: 'pages/shop/shop.html',
            controller: 'furryShopController'
        })

        .when("/shop/add-item", {
            templateUrl: 'pages/shop/add-item.html',
            controller: 'furryShopController'
        })

        .when("/shop/item/:id", {
            templateUrl: 'pages/shop/item.html',
            controller: 'furryShopController'
        })

        .when("/shop/manage", {
            templateUrl: 'pages/shop/manage-shop.html',
            controller: 'furryShopController'
        })

        .when("/shop/edit/item/:id", {
            templateUrl: 'pages/shop/edit-item.html',
            controller: 'furryShopController'
        })



    $locationProvider.hashPrefix('');
})