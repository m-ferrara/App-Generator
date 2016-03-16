define(function() {
    var Endpoint = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/endpoint",
        validate: function() {}
    });
    return Endpoint;
});