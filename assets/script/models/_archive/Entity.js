define(function() {
    var Entity = Backbone.Model.extend({
        url: "webservice/entity",
        validate: function() {}
    });
    return Entity;
});