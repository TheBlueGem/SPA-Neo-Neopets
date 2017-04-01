furryModule.filter("customSearch", function() {
    return function (items, input) {
        if(input == undefined){
            input = "";
        }
        var keys = [];
        var results = [];
        var searchstring = "";
        items.forEach(function(item) {
            keys = Object.keys(item);
            for(i = 0; i < keys.length; i++){
                if(keys[i] != "image" && typeof item[keys[i]] === "string"){                    
                    searchstring = item[keys[i]];
                    if(!(searchstring.toLowerCase().search(input.toLowerCase()) === -1)){
                        results.push(item);
                        return;
                    }
                }
            };
        }, this);
        return results;
    };
});