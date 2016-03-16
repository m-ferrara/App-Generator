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
    ,datatables: $ASSETS_URL_ROOT + 'jquery.dataTables.min'
	,AttributeRules: $ASSETS_URL_ROOT + 'AttributeRules'
	,EntityRules: $ASSETS_URL_ROOT + 'EntityRules'
	,TEST_SCRIPT: $ASSETS_URL_ROOT + 'TEST_SCRIPT'
  }
  
  ,shim: {
    'jQuery' : {
        exports: "jQuery"
    }
	,'TEST_SCRIPT' : ['jQuery','EntityRules', 'AttributeRules']
  }
});


require(['TEST_SCRIPT'], function(TEST_SCRIPT) {
	// Make Script Executes Code Generation Functions of *Generator Scripts (Controller,Model,Validation)
	// and outputs code to textareas on http://localhost/App-Generator/util/output
	TEST_SCRIPT.initialize();
});