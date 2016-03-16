// boot.js  Backbone Dependencies and App.init()
var $isMac = (window.navigator.userAgent.indexOf("Mac") > -1) ? true : false; 

var $APP_URL_ROOT = ($isMac) ? 'http://localhost:8888/App-Generator/' : 'http://localhost/App-Generator/';

// var $APP_URL_ROOT = window.location.href;

var $ASSETS_URL_ROOT = $APP_URL_ROOT + 'assets/js/code-gen/';

require.config({
  // baseUrl: 'http://localhost/WIA-APP/assets'
  //,
  paths: {
//    jQuery: $APP_URL_ROOT + 'assets/scripts/libs/jquery'

    jQuery: $ASSETS_URL_ROOT + 'jQuery'

	,AttributeRules: $ASSETS_URL_ROOT + 'AttributeRules'
	,EntityRules: $ASSETS_URL_ROOT + 'EntityRules'
	,ControllersGenerator: $ASSETS_URL_ROOT + 'ControllersGenerator'
	,ValidationGenerator: $ASSETS_URL_ROOT + 'ValidationGenerator'
	,RequestPayloadGenerator: $ASSETS_URL_ROOT + 'RequestPayloadGenerator'
	,ModelsGenerator: $ASSETS_URL_ROOT + 'ModelsGenerator'
	,BackboneGenerator: $ASSETS_URL_ROOT + 'BackboneGenerator'
	,MAKE_SCRIPT: $ASSETS_URL_ROOT + 'MAKE_SCRIPT'
  }
  
  ,shim: {
    'jQuery' : {
        exports: "jQuery"
    }
    ,'ControllersGenerator' : ['EntityRules','jQuery']
	,'ValidationGenerator': ['EntityRules', 'AttributeRules']
	,'ModelsGenerator' : ['AttributeRules','EntityRules', 'ValidationGenerator']
	,'MAKE_SCRIPT' : ['jQuery','ControllersGenerator','ValidationGenerator','ModelsGenerator']
  }
});


require(['MAKE_SCRIPT'], function(MAKE_SCRIPT) {
	// Make Script Executes Code Generation Functions of *Generator Scripts (Controller,Model,Validation)
	// and outputs code to textareas on http://localhost/App-Generator/util/output
	MAKE_SCRIPT.initialize();
});