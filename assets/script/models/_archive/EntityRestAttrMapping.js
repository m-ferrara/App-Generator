define(function() {
    var EntityRestAttrMapping = Backbone.Model.extend({
        url: "webservice/entity_rest_attr_mapping",
        validate: function() {}
    });
    return EntityRestAttrMapping;
});