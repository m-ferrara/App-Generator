define(function() {
    var Api = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/api",
        validate: function() {}
    });
    return Api;
});