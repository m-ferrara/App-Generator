// boot.js  Backbone Dependencies and App.init()
var $isMac = (window.navigator.userAgent.indexOf("Mac") > -1) ? true : false; 

var $APP_URL_ROOT = ($isMac) ? 'http://localhost:8888/App-Generator/' : 'http://localhost/App-Generator/';

//var $APP_URL_ROOT = window.location.href;

var $ASSETS_SCRIPT_URL_ROOT = $APP_URL_ROOT + 'assets/script/';
var $LIB_SCRIPTS_URL = $ASSETS_SCRIPT_URL_ROOT + "libs/";
require.config({
  baseUrl: $ASSETS_SCRIPT_URL_ROOT
  ,paths: {
    jquery: $LIB_SCRIPTS_URL + 'jquery'
	,jquerymigrate: $LIB_SCRIPTS_URL + 'jquery-migrate'
	,_: $LIB_SCRIPTS_URL + 'underscore'
	,Backbone: $LIB_SCRIPTS_URL + 'backbone'
	,Handlebars: $LIB_SCRIPTS_URL + 'handlebars.runtime'
	,HandlebarsHelpers: "HandlebarsHelpers"
	,BackboneForms : $LIB_SCRIPTS_URL + 'backbone-forms.min'
	,text: $LIB_SCRIPTS_URL + 'text'
	//,templates: $APP_URL_ROOT + 'assets/templates/html'
	,util : 'util'
	,AppGenerator : 'AppGenerator'
	,router : 'router'
	,epoxy : $LIB_SCRIPTS_URL + 'backbone.epoxy.min'
  }
  
  ,shim: {
    'jquery' : {
        exports: "jquery"
    },
    'Handlebars' : {
    	exports : "Handlebars"
    },
    'Backbone' : {
    	deps : ['jquery','_','Handlebars'],
    	exports: "Backbone"
    },
	'jquerymigrate' : {
		deps: ['jquery']
	},
	'AppGenerator': ['Backbone']
  }
});


require(['AppGenerator'], function(AppGenerator) {
	AppGenerator.initialize();
});