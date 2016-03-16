define(['PostmanVar', 'EntityRules'], function(PostmanVar, EntityValidationRules) {
//	  var pM = PostmanVar;  // remove Comment to refactor variable object
	var pM = {
				"beginCollectionToGuidId" : "\"{ \"\"id\"\": \"\"\" ",
				"collectionIdToName" : "\"\"\", \"\"name\"\": \"\"\" ",
				"collectionNameToDescription" : "\"\"\", \"\"description\"\": \"\"\" ",
				"collectionDescToOrder" : "\"\"\", \"\"order\"\": [\" ",
				"collectionOrderToFoldersArray" : "\"], \"\"folders\"\": [\" ",
				"collectionFolderBeginId" : "\" { \"\"id\"\": \"\"\" ",
				"collectionFolderIdToName" : "\"\"\", \"\"name\"\": \"\"\" ",
				"collectionNameToOrder" : "\"\"\", \"\"description\"\": \"\"\"\", \"\"write\"\": true, \"\"order\"\": [\" ",
				"folderCollectionName" : "\"], \"\"collection_name\"\": \"\"\" ",
				"folderCollNameToCollId" : "\"\"\", \"\"collection_owner\"\": \"\"\"\", \"\"collection_id\"\": \"\"\" ",
				"folderCollIdToCollection" : "\"\"\", \"\"collection\"\": \"\"\" ",
				"folderCollectionToEnd" : "\"\"\", \"\"owner\"\": \"\"\"\" }\" ",
				"CollectionFoldersEndToRequests" : "\"], \"\"timestamp\"\": 1424061917938, \"\"synced\"\": false, \"\"owner\"\": \"\"\"\", \"\"subscribed\"\": false, \"\"remoteLink\"\": \"\"\"\", \"\"public\"\": false, \"\"write\"\": true, \"\"requests\"\": [\" ",
				"requestBeginToId" : "\"{ \"\"id\"\": \"\"\" ",
				"requestIdToHeaders" : "\"\"\", \"\"headers\"\": \"\"\" ",
				"requestHeaderToUrl" : "\"\"\", \"\"url\"\": \"\"\" ",
				"requestUrlToMethod" : "\"\"\", \"\"pathVariables\"\" : {}, \"\"preRequestScript\"\" : \"\"\"\", \"\"method\"\" : \"\"\" ",
				"requestMethodToCollectionId" : "\"\"\", \"\"collectionId\"\" : \"\"\" ",
				"requestCollectionToDatamode" : "\"\"\", \"\"data\"\" : [], \"\"dataMode\"\" : \"\"\" ",
				"requestDatamodeToName" : "\"\"\", \"\"name\"\" : \"\"\" ",
				"requestNameToFolder" : "\"\"\", \"\"description\"\" : \"\"\"\", \"\"descriptionFormat\"\" : \"\"html\"\", \"\"time\"\" : 1425949766454, \"\"version\"\" : 2, \"\"responses\"\" : [], \"\"tests\"\" : \"\"\"\", \"\"currentHelper\"\" : \"\"normal\"\", \"\"helperAttributes\"\" : {}, \"\"collectionOwner\"\" : 0, \"\"write\"\" : true, \"\"folder\"\" : \"\"\" ",
				"requestFolderToSynced" : "\"\"\", \"\"synced\"\" : false\" ",
				"requestSyncedToRawModeData" : "\", \"\"rawModeData\"\" : \"\"\" ",
				"requestRawModeDataToEndObj" : "\"\"\" }\" ",
				"closeObj" : "}",
				"closeRequestsAndCollection" : "]}",
				"Comma" : ", ",
				"Get" : "GET ",
				"Post" : "POST ",
				"Put" : "PUT ",
				"Delete" : "DELETE ",
				"dmRaw" : "raw ",
				"dmParams" : "params ",
				"rqHdrContentType" : "Content-Type: application/json\n ",
				"rqHdrAccept" : "Accept: application/json\n ",
				"rqHdrXAPIKEY" : "X-Api-Key: ninja\n"
			};
			
// js doc
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};
	var PostmanCollection = {}, $POSTMAN_OUTPUT = '';
	PostmanCollection.METHODS = ['GET','PUT','POST','DELETE'];
	PostmanCollection.ENTITIES = EntityValidationRules.ENTITIES;
	
	PostmanCollection.BuildCollectionFileContents = function ()
	{
		// Begin Id and Name
		$POSTMAN_OUTPUT = pM.beginCollectionToGuidId + guid();
	  // iterate ENTITIES to output PHP RESTful Model (GET, PUT, POST, DELETE)
	  var $EntitiesCt = PostmanCollection.ENTITIES.length,
		entities = PostmanCollection.ENTITIES,
		counter,
		counterDx;
	
	  for ( counter = 0; counter < $EntitiesCt; counter++) {
		// iterate through each object - using resource name and HTTP method as name convention for Model Methods.
		var $RESOURCE = entities[ counter ].resource,
			  $DB_TABLE = entities[ counter ].table_name,
			  $ATTRIBUTES = entities[ counter ].attributes,
			  $ID_PARAMS = entities[ counter ].identifiers,
			  attrCounter, idCounter;
			 
			  
			  for ( counterDx = 0; counterDx < PostmanCollection.METHODS.length; counterDx++ ) {
			  // GET, PUT, POST, DELETE from  PostmanCollection.METHODS array.
		// end function declaration BEGIN function Body.
					switch (PostmanCollection.METHODS[ counterDx ]) {
						case "GET" :
							// call get generator, pass params
							PostmanCollection.COLLECTION_GET_GENERATOR($RESOURCE, $DB_TABLE, $ID_PARAMS);
							PostmanCollection.GET_GENERATOR( $RESOURCE, $DB_TABLE, $ID_PARAMS);
							break;
						case "PUT" :
							// call put generator, pass params
							PostmanCollection.PUT_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
							break;
						case "POST" :
							// call post generator, pass params
							PostmanCollection.POST_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
							break;
						case "DELETE" :
							// call delete generator, pass params
							PostmanCollection.DELETE_GENERATOR( $RESOURCE, $DB_TABLE, $ATTRIBUTES, $ID_PARAMS);
							break;					
					 default :
							break;
					}
		}
		$POSTMAN_OUTPUT += "} ";
		
		$POSTMAN_OUTPUT += "";
		$POSTMAN_OUTPUT += "";
		
		$POSTMAN_OUTPUT += "/* end of "+ $RESOURCE.capitalize() +".php */";
	  }
		//console.log( $POSTMAN_OUTPUT );
		return $POSTMAN_OUTPUT;
	};
	PostmanCollection.COLLECTION_GET_GENERATOR = function (resource, db_table, ids) {
	// function declaration.
		$POSTMAN_OUTPUT += "function collection_get() { ";
		
		$POSTMAN_OUTPUT += "$modelResult = $this->"+ resource +"_model->get_all();";  // MODEL REQUEST METHOD INVOCATION
		
		$POSTMAN_OUTPUT += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
		$POSTMAN_OUTPUT += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " does not exist.\"), 200);";
		$POSTMAN_OUTPUT += "} ";
		$POSTMAN_OUTPUT += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
		
		$POSTMAN_OUTPUT += "   $this->response($modelResult, 200); ";
	
		$POSTMAN_OUTPUT += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
	
		$POSTMAN_OUTPUT += "}";		
	};
	PostmanCollection.GET_GENERATOR = function( resource, db_table, ids) {
	// function declaration.
		$POSTMAN_OUTPUT += "function index_get() { ";
		
		// construct get array
		$POSTMAN_OUTPUT += "$getArray = array(";  // CONSTRUCT GET ARRAY
		for (var u=0; u<ids.length; u++)
		{
			if(u !== (ids.length - 1)) {
			$POSTMAN_OUTPUT += "\"" + ids[ u ] + "\"=> $this->get(\"" + ids[ u ] + "\"),";
			} else {
			$POSTMAN_OUTPUT += "\"" + ids[ u ] + "\"=> $this->get(\"" + ids[ u ] + "\")";
			}
		}	
		$POSTMAN_OUTPUT += ");";	
	
		
		$POSTMAN_OUTPUT += "$validData = $this->"+ resource +"_model->validate( $getArray, \"get\" );"; // VALIDATE METHOD INVOCATION 
		
		$POSTMAN_OUTPUT += "if	(!$validData[\"isValid\"]){";  // INVALID REQUEST PARAMS HANDLER
		$POSTMAN_OUTPUT += "$this->response( json_decode($validData[\"errorMsg\"]) );";
		$POSTMAN_OUTPUT += "} ";
		$POSTMAN_OUTPUT += "else { $sanatizedPayload = $validData[\"payload\"];";  // BEGIN ELSE block: VALID REQUEST PARAMS
		
			$POSTMAN_OUTPUT += "$modelResult = $this->"+ resource +"_model->get( $sanatizedPayload );";  // MODEL REQUEST METHOD INVOCATION
			
			$POSTMAN_OUTPUT += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$POSTMAN_OUTPUT += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " does not exist.\"), 200);";
			$POSTMAN_OUTPUT += "} ";
			$POSTMAN_OUTPUT += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$POSTMAN_OUTPUT += "   $this->response($modelResult, 200); ";
		
			$POSTMAN_OUTPUT += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$POSTMAN_OUTPUT += "}"; // END of ELSE block
	
		$POSTMAN_OUTPUT += "}";
	};
	// this is a comment
	/*
	 * this is a block comment.
	 */
	PostmanCollection.POST_GENERATOR = function( resource, db_table, attributes, ids) {
	// function declaration.
		$POSTMAN_OUTPUT += "function index_post() { ";
		
		// put array
		$POSTMAN_OUTPUT += "$postArray = array(";  // CONSTRUCT post ARRAY
		for (var u=0; u < attributes.length; u++)
		{
			if (attributes[u] != "id")
			{
				if(u !== (attributes.length - 1)) {
				$POSTMAN_OUTPUT += "\"" + attributes[ u ] + "\"=> $this->post(\"" + attributes[ u ] + "\"),";
				} else {
				$POSTMAN_OUTPUT += "\"" + attributes[ u ] + "\"=> $this->post(\"" + attributes[ u ] + "\")";
				}
			}
		}	
		$POSTMAN_OUTPUT += ");";	
	// ARRAY CONSTRUCTED
	
		$POSTMAN_OUTPUT += "$validData = $this->"+ resource +"_model->validate( $postArray, \"post\" );"; // VALIDATE METHOD INVOCATION 
		
		$POSTMAN_OUTPUT += "if	(!$validData[\"isValid\"]){";   // INVALID REQUEST PARAMS HANDLER
		$POSTMAN_OUTPUT += "$this->response( json_decode($validData[\"errorMsg\"]) );";
		$POSTMAN_OUTPUT += "} ";
		$POSTMAN_OUTPUT += "else { $sanatizedPayload = $validData[\"payload\"];";  // BEGIN ELSE block: VALID REQUEST PARAMS
		
			$POSTMAN_OUTPUT += "$modelResult = $this->"+ resource +"_model->post( $sanatizedPayload );";  // MODEL REQUEST METHOD INVOCATION
			
			$POSTMAN_OUTPUT += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$POSTMAN_OUTPUT += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " post request failure.\"), 200);";
			$POSTMAN_OUTPUT += "} ";
			$POSTMAN_OUTPUT += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$POSTMAN_OUTPUT += "   $this->response($modelResult, 200); ";
		
			$POSTMAN_OUTPUT += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$POSTMAN_OUTPUT += "}"; // END of ELSE block
		
		
		$POSTMAN_OUTPUT += "}";
	};
	
	PostmanCollection.PUT_GENERATOR = function( resource, db_table, attributes, ids) {
	// function declaration.
		$POSTMAN_OUTPUT += "function index_put() { ";
		
		// where array
		$POSTMAN_OUTPUT += "$whereArray = array(";   // CONSTRUCT WHERE  ARRAY
		for (var u=0; u<ids.length; u++)
		{
			if(u !== (ids.length - 1)) {
			$POSTMAN_OUTPUT += "\"" + ids[ u ] + "\"=> $this->put(\"" + ids[ u ] + "\"),";
			} else {
			$POSTMAN_OUTPUT += "\"" + ids[ u ] + "\"=> $this->put(\"" + ids[ u ] + "\")";
			}
		}	
		$POSTMAN_OUTPUT += ");";	
		// WHERE ARRAY CONSTRUCTED
		
		
		$POSTMAN_OUTPUT += "$putArray = array(";   // CONSTRUCT PUT ARRAY
		for (var u=0; u<attributes.length; u++)
		{
			if(u !== (attributes.length - 1)) {
			$POSTMAN_OUTPUT += "\"" + attributes[ u ] + "\"=> $this->put(\"" + attributes[ u ] + "\"),";
			} else {
			$POSTMAN_OUTPUT += "\"" + attributes[ u ] + "\"=> $this->put(\"" + attributes[ u ] + "\")";
			}
		}	
		$POSTMAN_OUTPUT += ");";	
		// PUT ARRAY CONSTRUCTED
	
		
		$POSTMAN_OUTPUT += "$validData = $this->"+ resource +"_model->validate( $putArray, \"put\" );"; // VALIDATE METHOD INVOCATION 
		
		$POSTMAN_OUTPUT += "if	(!$validData[\"isValid\"]){";  // INVALID REQUEST PARAMS HANDLER
		$POSTMAN_OUTPUT += " $this->response( json_decode($validData[\"errorMsg\"]) );";
		$POSTMAN_OUTPUT += "} ";
		$POSTMAN_OUTPUT += "else { $sanatizedPayload = $validData[\"payload\"];";  // BEGIN ELSE block: VALID REQUEST PARAMS
		
			$POSTMAN_OUTPUT += "$modelResult = $this->"+ resource +"_model->put( $sanatizedPayload, $whereArray );";  // MODEL REQUEST METHOD INVOCATION
			
			$POSTMAN_OUTPUT += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$POSTMAN_OUTPUT += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " put request failure.\"), 200);";
			$POSTMAN_OUTPUT += "} ";
			$POSTMAN_OUTPUT += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$POSTMAN_OUTPUT += "   $this->response($modelResult, 200); ";
		
			$POSTMAN_OUTPUT += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$POSTMAN_OUTPUT += "}"; // END of ELSE block
		
		
		$POSTMAN_OUTPUT += "}";
	};
	
	PostmanCollection.DELETE_GENERATOR = function( resource, db_table, attributes, ids) {
		// function declaration
		$POSTMAN_OUTPUT += "function index_delete() { ";
		// where array
		$POSTMAN_OUTPUT += "$whereArray = array(";   // CONSTRUCT WHERE  ARRAY
		for (var u=0; u<ids.length; u++)
		{
			if(u !== (ids.length - 1)) {
			$POSTMAN_OUTPUT += "\"" + ids[ u ] + "\"=> $this->delete(\"" + ids[ u ] + "\"),";
			} else {
			$POSTMAN_OUTPUT += "\"" + ids[ u ] + "\"=> $this->delete(\"" + ids[ u ] + "\")";
			}
		}	
		$POSTMAN_OUTPUT += ");";	
		// ARRAY CONSTRUCTED
		
		$POSTMAN_OUTPUT += "$validData = $this->"+ resource +"_model->validate( $whereArray, \"delete\" );"; // VALIDATE METHOD INVOCATION 
		
		$POSTMAN_OUTPUT += "if	(!$validData[\"isValid\"]){$this->response( json_decode($validData[\"errorMsg\"]) );}";  // INVALID REQUEST PARAMS HANDLER	
		
		$POSTMAN_OUTPUT += "else { $sanatizedPayload = $validData[\"payload\"];"; 
		
			$POSTMAN_OUTPUT += "$modelResult = $this->"+ resource +"_model->delete( $whereArray );";  // MODEL REQUEST METHOD INVOCATION
			
			$POSTMAN_OUTPUT += "if(!$modelResult) {";  // MODEL REQUEST FAILURE HANDLER
			$POSTMAN_OUTPUT += "  $this->response(array(\"success\"=>\"false\",\"errorMsg\"=>\"" + resource + " delete request failure.\"), 200);";
			$POSTMAN_OUTPUT += "} ";
			$POSTMAN_OUTPUT += "else { ";  // BEGIN ELSE: MODEL REQUEST SUCCESS
			
			$POSTMAN_OUTPUT += "   $this->response($modelResult, 200); ";
		
			$POSTMAN_OUTPUT += "}"; // END of ELSE: MODEL REQUEST SUCCESS
		
		$POSTMAN_OUTPUT += "}"; // END of ELSE block
	
		
		$POSTMAN_OUTPUT += "}";
	};
	
	return PostmanCollection;
});
// guid helper function - does not garuantee uniqueness
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

});
	