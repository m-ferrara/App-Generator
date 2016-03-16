define(function() {
    var ApiEntityMapping = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/api_entity_mapping",
        validate: function() {}
    });
    return ApiEntityMapping;
});