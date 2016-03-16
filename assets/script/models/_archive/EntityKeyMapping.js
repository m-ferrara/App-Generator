define(function() {
    var EntityKeyMapping = Backbone.Model.extend({
        url: "webservice/entity_key_mapping",
        validate: function() {}
    });
    return EntityKeyMapping;
});