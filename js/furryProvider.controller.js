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

        .when("/player-profile", {
            templateUrl: 'pages/player-profile.html',
            controller: 'furryPlayerController'
        })

        .when("/shop", {
            templateUrl: 'pages/shop.html',
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



    $locationProvider.hashPrefix('');
})