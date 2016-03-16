define(function() {
    var EntityRestProfile = Backbone.Model.extend({
        url: "webservice/entity_rest_profile",
        validate: function() {}
    });
    return EntityRestProfile;
});