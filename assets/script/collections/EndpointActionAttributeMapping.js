define(function() {
    var EndpointActionAttributeMapping = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/endpoint_action_attribute_mapping",
        validate: function() {}
    });
    return EndpointActionAttributeMapping;
});