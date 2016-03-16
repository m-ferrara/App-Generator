define(['EntityRules','ValidationGenerator'], function(EntityRules, ValidationGenerator) {
	// js doc
/**
  *
  * Code Generator. BackboneGenerator.  Perform Validation per HTTP Method validation requirements.
  *
**/
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
var BackboneGenerator = {};

// GenerateCSV returns all Backbone Models and Collections in CSV | pipe-delimitted format.
BackboneGenerator.GenerateCSV = function ()
{
	$_JS_OUTPUT_VAR = '';
  // iterate ENTITIES to output JS Model/Collection per Entity. 
  var $EntitiesCt = EntityRules.ENTITIES.length,
	entities = EntityRules.ENTITIES,
	counter,
	counterDx;
// Create File and Contents in Comma Separated Format
  for ( counter = 0; counter < $EntitiesCt; counter++) {
  	$FileAndContents = "";
	// iterate through each object - using resource name and HTTP method as name convention for Model Methods.
	var $RESOURCE = entities[ counter ].resource,
		$BACKBONE_NAME = entities[ counter ].backbone_name,
		  $DB_TABLE = entities[ counter ].table_name,
		  $ATTRIBUTES = entities[ counter ].attributes,
		  $ID_PARAMS = entities[ counter ].identifiers,
		  attrCounter, idCounter;

	$FileAndContents += BackboneGenerator.MODEL_GENERATOR( $BACKBONE_NAME, $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS, counter);
	
	$FileAndContents += BackboneGenerator.COLLECTION_GENERATOR( $BACKBONE_NAME, $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
  
	$_JS_OUTPUT_VAR += $FileAndContents;
  }
  
  return $_JS_OUTPUT_VAR;
};  

BackboneGenerator.MODEL_GENERATOR = function( $BACKBONE_NAME, $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS, counter)
{	
	var $MODEL_OUTPUT = "";
		// need to seperate code name, contents with delimitter '|'
		  if (counter != 0)
		  {
		  	// if very first entity, do not include initial separator, else require initial pipe
		  	$MODEL_OUTPUT += "|";
		  }
		// Name of file to be generated
		$MODEL_OUTPUT += $BACKBONE_NAME.trim() + ".js|";
			
	$MODEL_OUTPUT += "define(function(){";
		  
		// Begin Code
		$MODEL_OUTPUT += "var " + $BACKBONE_NAME + " = Backbone.Model.extend({";
		// include url property
		$MODEL_OUTPUT += "url: $APP_URL_ROOT + 'webservice/" + $RESOURCE + "'";

		// include validate function
		$MODEL_OUTPUT += ",validate: function(){" + "" + "}";
		$MODEL_OUTPUT += "});";
		
	  $MODEL_OUTPUT += "return " + $BACKBONE_NAME + ";";

	$MODEL_OUTPUT += "});";
	
	
	$MODEL_OUTPUT += "|";
	return $MODEL_OUTPUT;
};
	
BackboneGenerator.COLLECTION_GENERATOR = function( $BACKBONE_NAME, $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS)
{
		var $COLLECTION_OUTPUT = "";
		// Name of file to be generated
		$COLLECTION_OUTPUT += $BACKBONE_NAME.trim() + "Collection.js|";
			
	$COLLECTION_OUTPUT += "define(['models/" + $BACKBONE_NAME + "'], function(" + $BACKBONE_NAME + "){";
		  
		// Begin Code
		$COLLECTION_OUTPUT += "var " + $BACKBONE_NAME;
		$COLLECTION_OUTPUT += "Clxn";
		$COLLECTION_OUTPUT += " = ";
		$COLLECTION_OUTPUT += " Backbone.Collection.extend({";

		$COLLECTION_OUTPUT += "model: " + $BACKBONE_NAME;
		// include url property
		$COLLECTION_OUTPUT += ",url: $APP_URL_ROOT + 'webservice/" + $RESOURCE + "s'";
		$COLLECTION_OUTPUT += "});";
	  		$COLLECTION_OUTPUT += "return " + $BACKBONE_NAME + "Clxn;";

	$COLLECTION_OUTPUT += "});";
	
	return $COLLECTION_OUTPUT;	
};

	return BackboneGenerator;
});