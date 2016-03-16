define(['EntityRules','ValidationGenerator'], function(EntityValidationRules, ValidationGenerator) {
	// js doc
/**
  *
  * Code Generator. Models.  Perform Validation per HTTP Method validation requirements.
  *
**/
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
var MODELS = {}, $_PHP_OUTPUT_VAR = '';
MODELS.METHODS = ['GET','PUT','POST','DELETE'];
MODELS.ENTITIES = EntityValidationRules.ENTITIES;
MODELS.BUILD_CRUD = function ()
{
  // iterate ENTITIES to output PHP RESTful Model (GET, PUT, POST, DELETE)
  var $EntitiesCt = MODELS.ENTITIES.length,
	entities = MODELS.ENTITIES,
	counter,
	counterDx;

  for ( counter = 0; counter < $EntitiesCt; counter++) {
	// iterate through each object - using resource name and HTTP method as name convention for Model Methods.
	var $RESOURCE = entities[ counter ].resource,
		  $DB_TABLE = entities[ counter ].table_name,
		  $ATTRIBUTES = entities[ counter ].attributes,
		  $ID_PARAMS = entities[ counter ].identifiers,
		  attrCounter, idCounter;
		  // need to seperate code name, contents with delimitter '|'
		  if (counter != 0){
		  	$_PHP_OUTPUT_VAR += "|";
		  }
		  $_PHP_OUTPUT_VAR += $RESOURCE + "_model.php|" + "<?php class " + $RESOURCE.capitalize().trim() + "_model extends CI_Model {";
		  $_PHP_OUTPUT_VAR += "	function __construct() ";
		  $_PHP_OUTPUT_VAR += "	{ ";
		  $_PHP_OUTPUT_VAR += "	parent::__construct();";
		  $_PHP_OUTPUT_VAR += " 	}  ";
		  
		  // construct validator function
		 // MODELS.VALIDATOR_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS );
		  
		  for ( counterDx = 0; counterDx < MODELS.METHODS.length; counterDx++ ) {
		  // GET, PUT, POST, DELETE from  MODELS.METHODS array.
		// Construct functions to handle http-request methods.	
					switch (MODELS.METHODS[ counterDx ]) {
					case "GET" :
						// call get generator, pass params
						MODELS.GET_ALL_GENERATOR( $RESOURCE, $DB_TABLE, $ID_PARAMS);
						MODELS.GET_GENERATOR( $RESOURCE, $DB_TABLE, $ID_PARAMS);
						break;
					case "PUT" :
						// call put generator, pass params
						MODELS.PUT_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
						break;
					case "POST" :
						// call post generator, pass params
						MODELS.POST_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
						break;
					case "DELETE" :
						// call delete generator, pass params
						MODELS.DELETE_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
						break;					
				 default :
						break;
				}
	}
	
	$_PHP_OUTPUT_VAR += "";
	
	// $_PHP_OUTPUT_VAR += "function assembleRequestParamArray($requestMethod) { switch($requestMethod){case \"get\": $reqArray = $this->getAssembler(); return $reqArray; break; case \"put\": $reqArray = $this->putAssembler(); return $reqArray; break; case \"post\": $reqArray = $this->postAssembler(); return $reqArray; break; case \"delete\": $reqArray = $this->deleteAssembler(); return $reqArray; break; } }";
// 	
	// $_PHP_OUTPUT_VAR += RequestPayloadGenerator.REQUEST_ASSEMBLER($RESOURCE);

	
	$_PHP_OUTPUT_VAR += "function validate( $requestPayload , $requestMethod ) { switch($requestMethod){case \"get\": $validStatus = $this->getValidator( $requestPayload ); return $validStatus; break; case \"put\": $validStatus = $this->putValidator( $requestPayload ); return $validStatus; break; case \"post\": $validStatus = $this->postValidator( $requestPayload ); return $validStatus; break; case \"delete\": $validStatus = $this->deleteValidator( $requestPayload ); return $validStatus; break; } }";
	
	$_PHP_OUTPUT_VAR += ValidationGenerator.iterateEntityRuleSets($RESOURCE);
	
	$_PHP_OUTPUT_VAR += "}";
	
	$_PHP_OUTPUT_VAR += "/* end of "+ $RESOURCE.capitalize() +"_model.php */";
  }
	//console.log( $_PHP_OUTPUT_VAR );
	return $_PHP_OUTPUT_VAR;
};

MODELS.GET_ALL_GENERATOR = function( resource, db_table, ids) {
// function declaration.
	$_PHP_OUTPUT_VAR += "function get_all () { ";
	
	$_PHP_OUTPUT_VAR += "$dbResult = $this->db->get( \"" + db_table + "\" );";
	$_PHP_OUTPUT_VAR += "return $dbResult->result();";
	$_PHP_OUTPUT_VAR += "}";
};


MODELS.GET_GENERATOR = function( resource, db_table, ids) {
// function declaration.
	$_PHP_OUTPUT_VAR += "function get ( $getArray ) { ";
	
	// db calls
	$_PHP_OUTPUT_VAR += "$dbWhere = $this->db->where( $getArray ); ";
	$_PHP_OUTPUT_VAR += "$dbResult = $this->db->get( \"" + db_table + "\" );";
	$_PHP_OUTPUT_VAR += "if ($dbResult->num_rows()==1) {";
	$_PHP_OUTPUT_VAR += "return $dbResult->row();";
	$_PHP_OUTPUT_VAR += "} else if ($dbResult->num_rows()>1) {";
	$_PHP_OUTPUT_VAR += "return $dbResult->result(); }";
	$_PHP_OUTPUT_VAR += "else {";
	$_PHP_OUTPUT_VAR += "return false; }";
	$_PHP_OUTPUT_VAR += "}";
};

MODELS.POST_GENERATOR = function( resource, db_table, attributes, ids) {
// function declaration.
	$_PHP_OUTPUT_VAR += "function post ( $postArray ) { ";
	
	// put array
	
	// db call
	$_PHP_OUTPUT_VAR += "$dbInsert = $this->db->insert( \"" + db_table + "\", $postArray );";
	$_PHP_OUTPUT_VAR += "if ($dbInsert) {";
	$_PHP_OUTPUT_VAR += "return $this->db->insert_id();";
	$_PHP_OUTPUT_VAR += "}";
	$_PHP_OUTPUT_VAR += "else {";
	$_PHP_OUTPUT_VAR += "return false;";
	$_PHP_OUTPUT_VAR += "}";
	$_PHP_OUTPUT_VAR += "}";
};

MODELS.PUT_GENERATOR = function( resource, db_table, attributes, ids) {
// function declaration.
	$_PHP_OUTPUT_VAR += "function put ( $putArray, $whereArray ) { ";

	// db calls
	$_PHP_OUTPUT_VAR += "$dbWhere = $this->db->where( $whereArray );";
	$_PHP_OUTPUT_VAR += "$dbUpdate = $this->db->update( \"" + db_table + "\", $putArray );";
	$_PHP_OUTPUT_VAR += "if ($dbUpdate) {";
	// return success based on affected rows value
	$_PHP_OUTPUT_VAR += "$affectedRows = $this->db->affected_rows();";
	$_PHP_OUTPUT_VAR += "if ($affectedRows == 0) { return false; } else { return true; }";
	$_PHP_OUTPUT_VAR += "}";
	$_PHP_OUTPUT_VAR += "else {";
	$_PHP_OUTPUT_VAR += "return false;";
	$_PHP_OUTPUT_VAR += "}";
	
	$_PHP_OUTPUT_VAR += "}";
};

MODELS.DELETE_GENERATOR = function( resource, db_table, attributes, ids) {
	// function declaration
	$_PHP_OUTPUT_VAR += "function delete ( $whereArray ) { ";
	
	// db calls
	$_PHP_OUTPUT_VAR += "$dbWhere = $this->db->where( $whereArray );";
	$_PHP_OUTPUT_VAR += "$dbDelete = $this->db->delete( \"" + db_table + "\" );";
	// return success based on affected rows value
	$_PHP_OUTPUT_VAR += "$affectedRows = $this->db->affected_rows();";
	$_PHP_OUTPUT_VAR += "if ($affectedRows == 0) { return false; } else { return true; }";
	
	
	$_PHP_OUTPUT_VAR += "}";
};
	
	return MODELS;
});