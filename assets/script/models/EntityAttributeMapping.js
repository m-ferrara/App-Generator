define(function() {
    var EntityAttributeMapping = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/entity_attribute_mapping",
        validate: function() {}
    });
    return EntityAttributeMapping;
});