define(['Handlebars'], function(Handlebars){	
	
	var registerHelpers = function(Handlebars) {
			// register Handlebars Helpers
			Handlebars.registerHelper('checked', function(boolInt) {
			  return (boolInt == 1) ? 'checked="checked"' : "";
			});
			
			Handlebars.registerHelper('isTrue', function(boolInt) {
			  return (boolInt) ? 'true' : "false";
			});
			
			return Handlebars;
	};
	
	
	return {
		registerHelpers: registerHelpers
	};
});
