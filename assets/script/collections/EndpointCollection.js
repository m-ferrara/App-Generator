define([ "models/Endpoint" ], function(Endpoint) {
    var EndpointCollection = Backbone.Collection.extend({
        model: Endpoint,
        url: $APP_URL_ROOT + "webservice/endpoints"
    });
    return EndpointCollection;
});