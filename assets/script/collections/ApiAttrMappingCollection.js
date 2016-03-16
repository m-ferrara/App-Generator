define([ "models/ApiAttrMapping" ], function(ApiAttrMapping) {
    var ApiAttrMappingCollection = Backbone.Collection.extend({
        model: ApiAttrMapping,
        url: $APP_URL_ROOT + "webservice/api_attr_mappings"
    });
    return ApiAttrMappingCollection;
});