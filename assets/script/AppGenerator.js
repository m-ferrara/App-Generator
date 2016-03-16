define(['router','Handlebars', 'HandlebarsHelpers'], function(router, Handlebars, HandlebarsHelpers) {
	
	var initialize = function() {
		// register handlebars helpers
		Handlebars = HandlebarsHelpers.registerHelpers(Handlebars);
		// set Custom Header: X-API-KEY: ninja
		$.ajaxSetup({
		  	  headers: { 'X-API-KEY': 'ninja' }
			});
			
	  router.initialize();
	};
	

	return {
	  initialize: initialize
	};
});