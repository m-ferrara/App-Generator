define([ "models/Entity" ], function(Entity) {
    var EntityCollection = Backbone.Collection.extend({
        model: Entity,
        url: $APP_URL_ROOT + "webservice/entitys"
    });
    return EntityCollection;
});