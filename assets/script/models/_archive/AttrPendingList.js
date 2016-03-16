define(function() {
    var AttrPendingList = Backbone.Model.extend({
        url: "webservice/attr_pending_list",
        validate: function() {}
    });
    return AttrPendingList;
});