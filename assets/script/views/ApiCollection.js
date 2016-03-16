define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'Backbone',    // lib/backbone/backbone
  'Handlebars',
  'util', 
 // 'epoxy',
  '../../../assets/templates/handlebars/ApiListing.js'
], function($, _, Backbone, Handlebars, $Util, Templates){
  // handle handlebars lol
  //window.Handlebars = Handlebars;
  //console.log(AttributeTemplate);
  //window.attributeTemplate = AttributeTemplate;
  
  var apiCollectionView = Backbone.View.extend({
    el: $('#content'),
    
    template: Templates,
    
    events : {
    },
    
    initialize : function(options) {
 		//this.listenTo(this.collection, 'change', this.render);
 		//this.render();
    },

    render: function() {
      // this.$el.html(_.template(AttributeTemplate,{
      		// model: this.model.toJSON()
      		// }));
      		//console.log("render called");
      		var collectionJSON = this.collection.toJSON();
      	//	console.log(collectionJSON);
      	//	console.log(this.template());
      		
		this.$el.append(this.template(collectionJSON));		
      
      return this;
      
 	}
	    
  });

  return apiCollectionView;
});