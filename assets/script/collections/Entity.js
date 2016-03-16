define(function() {
    var Entity = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/entity",
        validate: function() {}
    });
    return Entity;
});