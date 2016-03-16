define([ "models/Attribute" ], function(Attribute) {
    var AttributeCollection = Backbone.Collection.extend({
        model: Attribute,
        url: $APP_URL_ROOT + "webservice/attributes"
    });
    return AttributeCollection;
});