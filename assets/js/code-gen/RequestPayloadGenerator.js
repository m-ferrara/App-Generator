define(['EntityRules','AttributeRules'],function(EntityRules, AttributeRules){
	/*
 *  Create PHP Http Request Payload Assembly Functions.
 *  @Returns PHP Check for presence of HTTP-Request Params and return array of supplied values in key val pairs.
 *  				   Per Request Method, e.g. getAseembler()
 */
var REST_CT = EntityRules.REST.length;

function REQUEST_ASSEMBLER( entity ) {
	var output = '';
	for (var i=0; i<REST_CT; i++){
	  if (entity == EntityRules.REST[i].ENTITY)
		{
			  var entityObj = EntityRules.REST[ i ],
				  entName = entityObj.ENTITY,
				  methodSet = entityObj.METHOD,
				  getSet = methodSet.GET,
				  putSet = methodSet.PUT,
				  postSet = methodSet.POST,
				  deleteSet = methodSet.DELETE;
				  
			// GET
			output += "function getAssembler()  {";
			output += assembleInner( getSet, "get"  );
			output += "}";
			
			// PUT
			output += "function putAssembler()  {";
			output += assembleInner( putSet, "put"  );
			output += "}";
			
			// POST
			output += "function postAssembler()  {";
			output += assembleInner( postSet, "post" );
			output += "}";
			
			// mf 5/31/2015: Handle params in url
			// // DELETE
			// output += "function deleteAssembler( )  {";
			// output += assembleInner( deleteSet, "delete"  );
			// output += "}";  	
		  
		}
	}
	
	return output;
}

/*  receives EXPECTED request payload (attributes Array)
 *  in form of REQUIRED, OPTIONAL, UNIQUE.
 *  REQUIRED = Presence of NOT NULL VALUE, 
 *  UNIQUE = Presence Existing in DB Invalidates Payload.
 */
 /* @METHOD assembleInner
 * @PARAMS methodSetObj { Object } Arrays of Attributes Required, Optional and Uniqueness condition.
 * @RETURNS { Object }  The Rules object of Specified Attribute, ie 'u_id' returns 
 *										{attribute : 'u_id', dataType : 'integer', regex: null}
*/
function assembleInner( methodSetObj, actionMethod ) {
	  	var attributes = aggregateAttributes( methodSetObj ),
			returnString = "";
/* DATATYPES:  "boolean"  "integer"  "double"   "string"  "array"  "object"  "resource"  "NULL"  */
	
	returnString += "\n\r// Assign Params if Detected \n\r";

	returnString += "$reqArray = array();\n\r";
	attributes.forEach(function( attr, index ) {
		returnString += "$" + attr + " = $this->" + actionMethod + "(\"" + attr + "\");";
		
		returnString += "if(is_string($" + attr + ") && strlen($" + attr + ") > 0) {";
		returnString += "$reqArray[\"" + attr + "\"] = $" + attr + ";}";
		
	});
	
	returnString += "return $reqArray;";
	
	return returnString;
}
	/* @method aggregateAttributes
	 * @params methodSet Object containing several arrays
	 * @returns concatenated array, result of combining 
	 * 			Required and Optional entity attributes - 
	 * 			forming complete array of attributes.
	 * 
	 */
function aggregateAttributes( methodSet ) {
	var requiredArr = [], optionalArr = methodSet.OPTIONAL, reqOrSetsArr = [], resultArr = [];
	// iterate REQUIRED, OPTIONAL arrays, placing values into AGGREGATE ARRAY
	if (methodSet.REQUIRED_ALWAYS.length > 0) {
		requiredArr = methodSet.REQUIRED_ALWAYS;
	}
	
	if (methodSet.REQUIRED_OR.length > 0) {
		methodSet.REQUIRED_OR.forEach(function(arr,idx){
			// concat required or array pair sets.
			reqOrSetsArr = reqOrSetsArr.concat(arr);
		});
	}
	
	resultArr = resultArr.concat(requiredArr);
	resultArr = resultArr.concat(optionalArr);
	resultArr = resultArr.concat(reqOrSetsArr);
	
	return resultArr;
}

RequestPayloadGenerator = {};
RequestPayloadGenerator.REQUEST_ASSEMBLER = REQUEST_ASSEMBLER;

return RequestPayloadGenerator;
});