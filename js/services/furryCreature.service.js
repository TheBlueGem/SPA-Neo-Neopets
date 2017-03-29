furryModule.service('creatureService', function(storageService){
    
    this.getCreatures = function(){
        return storageService.getFromStorage("shopCreatures");
    }

    this.getCreature = function(id){
        var creatures = this.getCreatures();
        var selectedCreature = {};

        creatures.forEach(function(creature) {
            if(creature.id === id){
                selectedCreature = creature;
                return;
            }
        }, this);
        
        return selectedCreature;
    }

    this.addCreature = function(creature){
        storageService.saveToStorage("shopCreatures", creature);
    }

    this.updateCreature = function(creature){
        storageService.updateStorage("shopCreatures", creature.id, creature);
    }

    this.removeCreature = function(id){
        storageService.removeFromStorage("shopCreatures", id);
    }

    /* this.getFeaturedCreatures = function(){
         var featuredCreatures = [];
         var creatures = this.getCreatures();

         creatures.forEach(function(creature){
            if(creature.featured){
                featuredCreatures.push(creature);
            }
         }, this)

        return featuredCreatures;
    }

    this.featureCreature = function(id){
        var creature = this.getCreature(id);
        creature.featured = true;
        this.updateCreature(creature)
    }

    this.unfeatureCreature = function(id){
        var creature = this.getCreature(id);
        creature.featured = false;
        this.updateCreature(creature)
    }*/

    this.hideCreature = function(id){
         var creature = this.getCreature(id);

        if(creature.hidden == false || creature.hidden == null){
            creature.hidden = true;   
            //creature.featured = false;
        }
        else
        {
            creature.hidden = false;
        }
        
        this.updateCreature(creature);        
    }
    
})