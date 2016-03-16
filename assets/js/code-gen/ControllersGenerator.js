define(['EntityRules','RequestPayloadGenerator'], function(EntityValidationRules,RequestPayloadGenerator) {
/* js file
	Controller generator
	<?php defined('BASEPATH') OR exit('No direct script access allowed');
	require APPPATH.'/libraries/REST_Controller.php';
*/

// js doc
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};
	var CONTROLLERS = {}, $_PHP_OUTPUT_VAR = '';
	CONTROLLERS.METHODS = ['GET','PUT','POST','DELETE'];
	CONTROLLERS.ENTITIES = EntityValidationRules.ENTITIES;
	
	CONTROLLERS.BUILD_CRUD = function ()
	{
	  // iterate ENTITIES to output PHP RESTful Model (GET, PUT, POST, DELETE)
	  var $EntitiesCt = CONTROLLERS.ENTITIES.length,
		entities = CONTROLLERS.ENTITIES,
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
			  $_PHP_OUTPUT_VAR += $RESOURCE + ".php|"; // filename
			  $_PHP_OUTPUT_VAR += "<?php defined(\"BASEPATH\") OR exit(\"No direct script access allowed\");require APPPATH.\"/libraries/REST_Controller.php\";";
			  $_PHP_OUTPUT_VAR += "class " + $RESOURCE.capitalize() + " extends REST_Controller {";
			   $_PHP_OUTPUT_VAR += "	function __construct() ";
			   $_PHP_OUTPUT_VAR += "	{ ";
			   $_PHP_OUTPUT_VAR += "	parent::__construct();";
			   $_PHP_OUTPUT_VAR += "	$this->load->model(\"" + $RESOURCE + "_model\");";
			   $_PHP_OUTPUT_VAR += " 	}  ";
			  
			  for ( counterDx = 0; counterDx < CONTROLLERS.METHODS.length; counterDx++ ) {
			  // GET, PUT, POST, DELETE from  CONTROLLERS.METHODS array.
		// end function declaration BEGIN function Body.
					switch (CONTROLLERS.METHODS[ counterDx ]) {
						case "GET" :
							// call get generator, pass params
							CONTROLLERS.COLLECTION_GET_GENERATOR($RESOURCE, $DB_TABLE, $ID_PARAMS);
							CONTROLLERS.GET_GENERATOR( $RESOURCE, $DB_TABLE, $ID_PARAMS);
							break;
						case "PUT" :
							// call put generator, pass params
							CONTROLLERS.PUT_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
							break;
						case "POST" :
							// call post generator, pass params
							CONTROLLERS.POST_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
							break;
						case "DELETE" :
							// call delete generator, pass params
							CONTROLLERS.DELETE_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
							break;					
					 default :
							break;
					}
		}
		
		$_PHP_OUTPUT_VAR += "function assembleRequestPayload($requestMethod) { switch($requestMethod){case \"get\": $reqArray = $this->getAssembler(); return $reqArray; break; case \"put\": $reqArray = $this->putAssembler(); return $reqArray; break; case \"post\": $reqArray = $this->postAssembler(); return $reqArray; break; } }";
	
		$_PHP_OUTPUT_VAR += RequestPayloadGenerator.REQUEST_ASSEMBLER($RESOURCE);
		
		$_PHP_OUTPUT_VAR += "} ";
		
		$_PHP_OUTPUT_VAR += "/* end of "+ $RESOURCE.capitalize() +".php */";
	  }
		//console.log( $_PHP_OUTPUT_VAR );
		return $_PHP_OUTPUT_VAR;
	};
	CONTROLLERS.COLLECTION_GET_GENERATOR = function (resource, db_table, ids) {
	// function declaration.
		$_PHP_OUTPUT_VAR += "function collection_get() { ";
		
		$_PHP_OUTPUT_VAR += "$modelResult = $this->"+ resource +"_model->get_all();";  // MODEL REQUEST METHOD INVOCATION
		
		$_PHP_OUTPUT_VAR += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
		$_PHP_OUTPUT_VAR += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " does not exist.\"), 200);";
		$_PHP_OUTPUT_VAR += "} ";
		$_PHP_OUTPUT_VAR += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
		
		$_PHP_OUTPUT_VAR += "   $this->response($modelResult, 200); ";
	
		$_PHP_OUTPUT_VAR += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
	
		$_PHP_OUTPUT_VAR += "}";		
	};
	CONTROLLERS.GET_GENERATOR = function( resource, db_table, ids) {
	// function declaration.
		$_PHP_OUTPUT_VAR += "function index_get() { ";
		
		// construct get params array
		$_PHP_OUTPUT_VAR += "$getArray = $this->assembleRequestPayload('get');";	
	
		
		$_PHP_OUTPUT_VAR += "$validData = $this->"+ resource +"_model->validate( $getArray, \"get\" );"; // VALIDATE METHOD INVOCATION 
		
		$_PHP_OUTPUT_VAR += "if	(!$validData[\"isValid\"]){";  // INVALID REQUEST PARAMS HANDLER
		$_PHP_OUTPUT_VAR += "$this->response( json_decode($validData[\"errorMsg\"]) );";
		$_PHP_OUTPUT_VAR += "} ";
		$_PHP_OUTPUT_VAR += "else { $sanatizedPayload = $validData[\"payload\"];";  // BEGIN ELSE block: VALID REQUEST PARAMS
		
			$_PHP_OUTPUT_VAR += "$modelResult = $this->"+ resource +"_model->get( $sanatizedPayload );";  // MODEL REQUEST METHOD INVOCATION
			
			$_PHP_OUTPUT_VAR += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$_PHP_OUTPUT_VAR += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " does not exist.\"), 200);";
			$_PHP_OUTPUT_VAR += "} ";
			$_PHP_OUTPUT_VAR += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$_PHP_OUTPUT_VAR += "   $this->response($modelResult, 200); ";
		
			$_PHP_OUTPUT_VAR += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$_PHP_OUTPUT_VAR += "}"; // END of ELSE block
	
		$_PHP_OUTPUT_VAR += "}";
	};
	// this is a comment
	/*
	 * this is a block comment.
	 */
	CONTROLLERS.POST_GENERATOR = function( resource, db_table, attributes, ids) {
	// function declaration.
		$_PHP_OUTPUT_VAR += "function index_post() { ";
		
		// post array
		$_PHP_OUTPUT_VAR += "$postArray = $this->assembleRequestPayload('post');";	

	// ARRAY CONSTRUCTED
	
		$_PHP_OUTPUT_VAR += "$validData = $this->"+ resource +"_model->validate( $postArray, \"post\" );"; // VALIDATE METHOD INVOCATION 
		
		$_PHP_OUTPUT_VAR += "if	(!$validData[\"isValid\"]){";   // INVALID REQUEST PARAMS HANDLER
		$_PHP_OUTPUT_VAR += "$this->response( json_decode($validData[\"errorMsg\"]) );";
		$_PHP_OUTPUT_VAR += "} ";
		$_PHP_OUTPUT_VAR += "else { $sanatizedPayload = $validData[\"payload\"];";  // BEGIN ELSE block: VALID REQUEST PARAMS
		
			$_PHP_OUTPUT_VAR += "$modelResult = $this->"+ resource +"_model->post( $sanatizedPayload );";  // MODEL REQUEST METHOD INVOCATION
			
			$_PHP_OUTPUT_VAR += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$_PHP_OUTPUT_VAR += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " post request failure.\"), 200);";
			$_PHP_OUTPUT_VAR += "} ";
			$_PHP_OUTPUT_VAR += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$_PHP_OUTPUT_VAR += "   $this->response($modelResult, 200); ";
		
			$_PHP_OUTPUT_VAR += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$_PHP_OUTPUT_VAR += "}"; // END of ELSE block
		
		
		$_PHP_OUTPUT_VAR += "}";
	};
	
	CONTROLLERS.PUT_GENERATOR = function( resource, db_table, attributes, ids) {
	// function declaration.
		$_PHP_OUTPUT_VAR += "function index_put() { ";
		
		// where array
		$_PHP_OUTPUT_VAR += "$whereArray = array(";   // CONSTRUCT WHERE  ARRAY
		for (var u=0; u<ids.length; u++)
		{
			if(u !== (ids.length - 1)) {
			$_PHP_OUTPUT_VAR += "\"" + ids[ u ] + "\"=> $this->put(\"" + ids[ u ] + "\"),";
			} else {
			$_PHP_OUTPUT_VAR += "\"" + ids[ u ] + "\"=> $this->put(\"" + ids[ u ] + "\")";
			}
		}	
		$_PHP_OUTPUT_VAR += ");";	
		// WHERE ARRAY CONSTRUCTED
		
		
		$_PHP_OUTPUT_VAR += "$putArray = $this->assembleRequestPayload('put');";
		// PUT ARRAY CONSTRUCTED
	
		
		$_PHP_OUTPUT_VAR += "$validData = $this->"+ resource +"_model->validate( $putArray, \"put\" );"; // VALIDATE METHOD INVOCATION 
		
		$_PHP_OUTPUT_VAR += "if	(!$validData[\"isValid\"]){";  // INVALID REQUEST PARAMS HANDLER
		$_PHP_OUTPUT_VAR += " $this->response( json_decode($validData[\"errorMsg\"]) );";
		$_PHP_OUTPUT_VAR += "} ";
		$_PHP_OUTPUT_VAR += "else { $sanatizedPayload = $validData[\"payload\"];";  // BEGIN ELSE block: VALID REQUEST PARAMS
		
			$_PHP_OUTPUT_VAR += "$modelResult = $this->"+ resource +"_model->put( $sanatizedPayload, $whereArray );";  // MODEL REQUEST METHOD INVOCATION
			
			$_PHP_OUTPUT_VAR += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$_PHP_OUTPUT_VAR += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " put request failure.\"), 200);";
			$_PHP_OUTPUT_VAR += "} ";
			$_PHP_OUTPUT_VAR += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$_PHP_OUTPUT_VAR += "   $this->response($modelResult, 200); ";
		
			$_PHP_OUTPUT_VAR += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$_PHP_OUTPUT_VAR += "}"; // END of ELSE block
		
		
		$_PHP_OUTPUT_VAR += "}";
	};
	
	CONTROLLERS.DELETE_GENERATOR = function( resource, db_table, attributes, ids) {
		// function declaration
		$_PHP_OUTPUT_VAR += "function index_delete( "; // do not close, handle url params in method signature
		var attrN = attributes.length;
		attributes.forEach(function( attr, index ) {
			if (index < (attrN -1)) 
			{
				$_PHP_OUTPUT_VAR += "$" + attr + "Key = null, $" + attr + "Val = null,";
			}
			else {
				$_PHP_OUTPUT_VAR += "$" + attr + "Key = null, $" + attr + "Val = null){";
			}
			
		});
		
		$_PHP_OUTPUT_VAR += "\n\r// Assign Params if Detected \n\r";
	
		$_PHP_OUTPUT_VAR += "$deleteArray = array();\n\r";
		attributes.forEach(function( attr, index ) {		
			$_PHP_OUTPUT_VAR += "if(is_string($" + attr + "Val) && strlen($" + attr + "Val) > 0) {";
			$_PHP_OUTPUT_VAR += "$deleteArray[\"" + attr + "\"] = $" + attr + "Val;}";
			
		});
		
		// ARRAY CONSTRUCTED
		
		$_PHP_OUTPUT_VAR += "$validData = $this->"+ resource +"_model->validate( $deleteArray, \"delete\" );"; // VALIDATE METHOD INVOCATION 
		
		$_PHP_OUTPUT_VAR += "if	(!$validData[\"isValid\"]){$this->response( json_decode($validData[\"errorMsg\"]) );}";  // INVALID REQUEST PARAMS HANDLER	
		
		$_PHP_OUTPUT_VAR += "else { $sanatizedPayload = $validData[\"payload\"];"; 
		
			$_PHP_OUTPUT_VAR += "$modelResult = $this->"+ resource +"_model->delete( $sanatizedPayload );";  // MODEL REQUEST METHOD INVOCATION
			
			$_PHP_OUTPUT_VAR += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$_PHP_OUTPUT_VAR += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " delete request failure.\"), 200);";
			$_PHP_OUTPUT_VAR += "} ";
			$_PHP_OUTPUT_VAR += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$_PHP_OUTPUT_VAR += "   $this->response($modelResult, 200); ";
		
			$_PHP_OUTPUT_VAR += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$_PHP_OUTPUT_VAR += "}"; // END of ELSE block
	
		
		$_PHP_OUTPUT_VAR += "}";
	};
	
	return CONTROLLERS;
});