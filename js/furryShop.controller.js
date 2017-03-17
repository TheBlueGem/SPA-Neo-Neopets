furryModule.controller("furryShopController", function($scope, $itemService){    
    
   $scope.shopItems = [
       {id:1, name:"koekje", price:"2", image:"/images/200x200.png"},
       {id:2, name:"snoepje", price:"5", image:"/images/200x200.png"},
       {id:3, name:"broodje", price:"15", image:"/images/200x200.png"},
       {id:4, name:"melk", price:"10", image:"/images/200x200.png"},
       {id:5, name:"steroids", price:"1000", image:"/images/200x200.png"},
   ] 

   $scope.item = {};

   $scope.addShopItem = function(){       
       itemService.addItem()
       console.log("Added");
   } 
});