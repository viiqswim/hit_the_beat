var GarbageCollector = function() {
    var created_objects = [];

    this.initialize = function() {
        created_objects = [];
    };

    this.add_object = function add_object(object) {
        // created_objects.push(object)
    };

    this.trash_objects = function trash_objects() {
        // for(var index = 0; index < created_objects.length; index++) {
        //     var object = created_objects[index];
        //     if (object !== null && object !== undefined) {
        //         object.destroy();
        //         created_objects.splice(1, index);
        //     }
        // }
        // _.each(created_objects, function(object, index) {
        //     if (object !== null && object !== undefined) {
        //         object.destroy();
        //         created_objects.splice(1, index);
        //     }
        // });
    };
};
