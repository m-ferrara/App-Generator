define([ "models/Api" ], function(Api) {
    var ApiCollection = Backbone.Collection.extend({
        model: Api,
        url: $APP_URL_ROOT + "webservice/apis"
    });
    return ApiCollection;
});