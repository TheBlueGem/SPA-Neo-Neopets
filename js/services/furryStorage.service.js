furryModule.service('storageService', function () {
    this.saveToStorage = function (key, data) {
        if (typeof (Storage) !== undefined) {
            if (localStorage.getItem(key) == null) {
                data.id = 1;
                localStorage.setItem(key, JSON.stringify([data]));
            } else {
                var temp = JSON.parse(localStorage.getItem(key)) || [];

                var highestId = 0;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].id > highestId) {
                        highestId = temp[i].id;
                    }
                }   

                data.id = (parseInt(highestId) + 1).toString();


                temp.push(data);
                localStorage.setItem(key, JSON.stringify(temp));
            }
        }
    };

    this.removeFromStorage = function (key, id) {
        var fromStorage = JSON.parse(localStorage.getItem(key));

        fromStorage.forEach(function (value) {
            if (value.id == id) {
                fromStorage.splice(fromStorage.indexOf(value), 1);
                localStorage.setItem(key, JSON.stringify(fromStorage));
            }
        }, this);
    };

    this.updateStorage = function (key, id, data) {
        var fromStorage = JSON.parse(localStorage.getItem(key));

        fromStorage.forEach(function (value) {
            if (value.id == id) {
                var jsonKeys = Object.keys(data);
                jsonKeys.forEach(function (jsonKey) {
                    value[jsonKey] = data[jsonKey];
                }, this);
            }
        }, this);

        localStorage.setItem(key, JSON.stringify(fromStorage));
    }

    this.getFromStorage = function (key) {
        return JSON.parse(localStorage.getItem(key));
    }

});