define([ "models/EntityAttributeMapping" ], function(EntityAttributeMapping) {
    var EntityAttributeMappingCollection = Backbone.Collection.extend({
        model: EntityAttributeMapping,
        url: $APP_URL_ROOT + "webservice/entity_attribute_mappings"
    });
    return EntityAttributeMappingCollection;
});