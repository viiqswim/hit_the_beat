var GarbageCollector = function() {
    var created_objects = [];

    this.add_object = function add_object(object) {
        console.log("adding_object")
        console.log(created_objects.length);
        created_objects.push(object)
    };

    this.trash_objects = function trash_objects() {
        _.each(created_objects, function(object, index) {
            if (object !== null && object !== undefined) {
                console.log("trashing object");
                object.destroy();
                created_objects.splice(1, index);
            }
        });
    };
};
