define(['text!../../templates/html/home.html'], function(indexTemplate) {
  var indexView = Backbone.View.extend({
    el: $('#content'),
    
    initialize: function() {
    	//this.render();
    },

    render: function() {
      this.$el.append(indexTemplate);
    }
  });

  return indexView;
});