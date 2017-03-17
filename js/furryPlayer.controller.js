furryModule.controller("furryPlayerController", function($scope){    
   $scope.player = {
       name:"Furry Henk", 
       dateJoined:"11-02-2000",
       image:"/images/200x200.png",
       inventory: [
           {amount:10, name:"koekje", image:"/images/200x200.png"},
           {amount:5, name:"snoepje", image:"/images/200x200.png"},
           {amount:3, name:"broodje", image:"/images/200x200.png"},
       ]       
    }
});