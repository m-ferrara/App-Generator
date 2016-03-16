define(function() {
    var ApiAttrMapping = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/api_attr_mapping",
        validate: function() {}
    });
    return ApiAttrMapping;
});