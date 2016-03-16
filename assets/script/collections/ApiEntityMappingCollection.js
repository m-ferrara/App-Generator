define([ "models/ApiEntityMapping" ], function(ApiEntityMapping) {
    var ApiEntityMappingCollection = Backbone.Collection.extend({
        model: ApiEntityMapping,
        url: $APP_URL_ROOT + "webservice/api_entity_mappings"
    });
    return ApiEntityMappingCollection;
});