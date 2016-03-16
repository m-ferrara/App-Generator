define(function() {
    var Attribute = Backbone.Model.extend({
        url: $APP_URL_ROOT + "webservice/attribute",
        validate: function() {}
    });
    return Attribute;
});