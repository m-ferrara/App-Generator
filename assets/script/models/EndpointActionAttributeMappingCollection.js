define([ "models/EndpointActionAttributeMapping" ], function(EndpointActionAttributeMapping) {
    var EndpointActionAttributeMappingCollection = Backbone.Collection.extend({
        model: EndpointActionAttributeMapping,
        url: $APP_URL_ROOT + "webservice/endpoint_action_attribute_mappings"
    });
    return EndpointActionAttributeMappingCollection;
});