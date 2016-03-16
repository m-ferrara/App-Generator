define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'Backbone',    // lib/backbone/backbone
  'Handlebars',
  'util', 
 // 'epoxy',
  '../../../assets/templates/handlebars/ApiCreate.js'
], function($, _, Backbone, Handlebars, $Util, Templates){
  // handle handlebars lol
  //window.Handlebars = Handlebars;
  //console.log(AttributeTemplate);
  //window.attributeTemplate = AttributeTemplate;
  
  var ApiCreateView = Backbone.View.extend({
    el: $('#content'),
    viewPanelEl: $("#api-create"),
    
    template: Templates,
        
    events : {
    	'click .btn.save-edit' : 'saveNew'
    	,'click .btn.delete' : 'confirmDelete'
    },
    
    initialize : function(options) {
 		this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      // this.$el.html(_.template(AttributeTemplate,{
      		// model: this.model.toJSON()
      		// }));
		this.$el.html(this.template(this.model.toJSON()));		

      return this;
      
    },
    
    saveNew : function(ev){
    	// stop button element from resetting form
    	ev.preventDefault();
    	// fix checkbox values
    	this.checkboxValueConvert();
    	// get form values, save
    	var formInput = $("#api-create input").serializeArray();
    	formInput = this.addUnselectedFields(formInput);
    	
    	
    	this.updateViewModel(formInput);

    	 alert(JSON.stringify(this.model.toJSON()));
    	this.model.save();
    },
    
    //Auxiliar function
	updateViewModel: function(formSerialized) { 
	    var self = this;
	    var unindexed_array = formSerialized;
	    $.map(unindexed_array, function(n, i){
	    	var keyName = n["name"];
	    	var keyVal = n["value"];
	    	var obj = {};
	    	obj[ keyName ] = keyVal;
	         self.model.set(obj);
	    });
	},
	
	checkboxValueConvert: function(){
		var chkBxs = $("input[type='checkbox']");
		if(chkBxs.length > 0)
		{
			chkBxs.each(function(i, el){
				var chkBox = $(el);
				if (chkBox.is(":checked"))
				{
					chkBox.attr('value','1');
				}
				else
				{
					chkBox.attr('value','0');
				}
			});
		}
	},
	
	addUnselectedFields: function(inputObj) {
	// recieves serializeArray array of name value objects
		var chkBxs = $("input[type='checkbox']");
		chkBxs.each(function(i,el){
			if(!$(el).is(":checked")){
			var name = $(el).attr("name"),
			val = $(el).attr("value");
			inputObj.push({'name':name,'value':val});
			}
		});
		return inputObj;
	}
	
  });
  return ApiCreateView;
});