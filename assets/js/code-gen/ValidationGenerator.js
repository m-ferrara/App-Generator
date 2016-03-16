define(['EntityRules','AttributeRules'],function(EntityRules, AttributeRules){
	/*
 *  Create PHP Validator Functions.
 *  @Returns PHP Check for presence and datatype of HTTP-Request Methods.
 *  				   Per Request Method, e.g. getValidator()
 */
var ATTRIBUTES_CT = EntityRules.REST.length;

function iterateEntityRuleSets( entity ) {
	var output = '';
	for (var i=0; i<ATTRIBUTES_CT; i++){
	  if (entity == EntityRules.REST[i].ENTITY)
		{
			  var entityObj = EntityRules.REST[ i ],
				  entName = entityObj.ENTITY,
				  methodSet = entityObj.METHOD,
				  getSet = methodSet.GET,
				  putSet = methodSet.PUT,
				  postSet = methodSet.POST,
				  deleteSet = methodSet.DELETE;
				  
			// Get Db Table
			var dbTableName = getTableName( entName );
			// GET
			output += "function getValidator( $RequestPayload )  {";
			output += validatorInner( getSet, dbTableName  );
			output += "}";
			
			// PUT
			output += "function putValidator( $RequestPayload )  {";
			output += validatorInner( putSet, dbTableName  );
			output += "}";
			
			// POST
			output += "function postValidator( $RequestPayload )  {";
			output += validatorInner( postSet, dbTableName );
			output += "}";
			
			// DELETE
			output += "function deleteValidator( $RequestPayload )  {";
			output += validatorInner( deleteSet, dbTableName  );
			output += "}";  	
		  
		}
	}
	
	return output;
}

/*  receives request payload (attributes Array)
 *  in form of REQUIRED, OPTIONAL, UNIQUE.
 *  REQUIRED = Presence of NOT NULL VALUE, 
 *  UNIQUE = Presence Existing in DB Invalidates Payload.
 *  Each Array must have it's Attributes cross-referenced 
 *  to return dataType. 
 */
 /* @METHOD validatorInner
 * @PARAMS methodSetObj { Object } Arrays of Attributes Required, Optional and Uniqueness condition.
 * @RETURNS { Object }  The Rules object of Specified Attribute, ie 'u_id' returns 
 *										{attribute : 'u_id', dataType : 'integer', regex: null}
*/
function validatorInner( methodSetObj, dbTableName ) {
	  	var required = methodSetObj.REQUIRED_ALWAYS,
	  		requiredOrSets = methodSetObj.REQUIRED_OR,
	  		attributes = aggregateAttributes( methodSetObj ),
			unique = methodSetObj.UNIQUE,
			returnString = "";
/* DATATYPES:  "boolean"  "integer"  "double"   "string"  "array"  "object"  "resource"  "NULL"  */

	  //	$validator = new Custom_Validator($validations, $mandatories, $sanatations, $unique);
 // iterate required
  // optional if supplied test dataType, null empty value allowable
		returnString += createValidations( attributes );
		
 // test dataType, and not null or empty value
		returnString += createRequired( required, requiredOrSets );

// sanatations - query db for exact or similar match
		returnString += createSanitizations( attributes );		
		
 // unique - query db for exact or similar match
		returnString += createUnique( unique, dbTableName );
		
		returnString += "$validator = new Custom_Validator($VldtnRules, $MandatoryRules, $MandatoryOrRules, $SntnRules, $UniqueRules);";
		
		returnString += "if ($validator->validate($RequestPayload)) {";
		returnString += "$sanatizedPayload = $validator->sanatize($RequestPayload);";
		returnString += "return array(\"isValid\" => true, \"payload\" => $sanatizedPayload);";
		returnString += "} else {";
		returnString += "return array(\"isValid\" => false, \"errorMsg\" => $validator->getJSON());";
		returnString += "}";
		
		return returnString;
}


function createRequired( required, requiredOrSets ) {
	var output = "";
	output += "$MandatoryRules = array(";
	var n = required.length;
	
	required.forEach(function( attr, index ) {
		if ((n - 1) !== index) {
			output +=  "\"" + attr + "\", ";
		} else {
			output +=  "\"" +  attr + "\"";
		}
	});
	
	output += ");";
	
	output += "$MandatoryOrRules = array(";
	var nR = requiredOrSets.length;
	
	requiredOrSets.forEach(function( orSet, index ) {
		if ((nR - 1) !== index) {
			output +=  "array(";
			var orN = orSet.length;
			orSet.forEach(function( attr, index ) {
				if ((orN - 1) !== index) {
					output +=  "\"" + attr + "\", ";
				} else {
					output +=  "\"" +  attr + "\"";
				}
			});
			output +=  "),";
		} else {
			output +=  "array(";
			var orN = orSet.length;
			orSet.forEach(function( attr, index ) {
				if ((orN - 1) !== index) {
					output +=  "\"" + attr + "\", ";
				} else {
					output +=  "\"" +  attr + "\"";
				}
			});
			output +=  ")";		}
	});
	
	output += ");";
	
	return output;
}

function createValidations( attributes ) {
	var output = "\n\r// Validation Rules \n\r";
	output += "$VldtnRules = array(";
	var n = attributes.length;
		
	attributes.forEach(function( attr, index ) {
		// get Attribute Validation Rules
		var attrRules = attributeRules( attr );
		if ((n - 1) !== index) {
			output += "\"" + attr + "\"=>\"" + attrRules.validation + "\", ";
		} else {
			output += "\"" + attr + "\"=>\"" + attrRules.validation + "\"";
		}
	});
	
	output += ");";
	
	return output;
}

/*	 *
	 *  createUnique assembles array of payload values and their corresponding db table.
	 *  @returns array($key=>$table_name,...)
	 *  
	 */
function createUnique( unique, dbTableName ) {
	var output = "";
	output += "$UniqueRules = array(";
	var n = unique.length;
	
	if (n>1) {
		// AND_CONDITIONAL syntax required per Custom_Validator spec
		output += "\"AND_CONDITIONAL\"=>array(\"TABLE\"=>\""+ dbTableName +"\",\"KEYS\"=>array(";
		unique.forEach(function( attr, index ) {
			// get Attribute Validation Rules
			var attrRules = attributeRules( attr );
			if ((n - 1) !== index) {
				output += "\"" + attr + "\", ";
			} 
			else {
				output += "\"" + attr + "\"))";
			}
			
		});
	} else {
		unique.forEach(function( attr, index ) {
			// get Attribute Validation Rules
			var attrRules = attributeRules( attr );
				output += "\"" + attr + "\"=>\"" + dbTableName + "\"";
		});
	}
	output += ");";
	
	return output;
}

/*	 *
 *  createUnique assembles array of payload values and their corresponding db table.
 *  @returns array($key=>$table_name,...)
 *  
 */
function createSanitizations( attributes ) {
	//console.log( attributes.toString() );
	var output = "\n\r// Sanatization Rules \n\r";
	output += "$SntnRules = array(";
	var n = attributes.length;
		
	attributes.forEach(function( attr, index ) {
		// get Attribute Validation Rules
		var attrRules = attributeRules( String(attr) );
		//console.log(attrRules);
		if ((n - 1) !== index) {
			output += "\"" + attr + "\"=>\"" + attrRules.validation + "\", ";
		} else {
			output += "\"" + attr + "\"=>\"" + attrRules.validation + "\"";
		}
		
	});
	
	output += ");";
	
	return output;
}
/*	 *  @method aggregateAttributes
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

/* @METHOD   attributeRules
 * @PARAMS   attribute { String } Given attribute of an Entity's HTTP-Request Payload Body.
 * @RETURNS   Rules object - of Specified Attribute, ie 'u_id' returns 
 *										{attribute : 'u_id', dataType : 'integer', regex: null}
*/
function attributeRules( attribute ) {
	var rulesObj = {},
		i;
	
	AttributeRules.forEach(function( attrObj, index ) {
		// get Attribute Validation Rules
		if ( attribute == attrObj.attribute )
		{
			//console.log(AttributeValidationRules[ i ]["attribute"]+ " " + attribute + " is good.");
			rulesObj.dataType = attrObj.dataType;
			rulesObj.regex = attrObj.regex;
			rulesObj.validation = attrObj.validation;
			rulesObj.sanatation = attrObj.sanatation;
			rulesObj.isUnique = attrObj.isUnique;
			rulesObj.tableName = attrObj.table_name;
			//else { continue; }
			return rulesObj;		
		}
	});	
	
	//console.log( "NOT GOOD: " + attribute + ".");
		// attribute undetected in ValidationRules [] Array, so return unspecified.
		rulesObj.dataType = "unspecified";
	//	console.log( attribute );
		return rulesObj;
}

/*
 * @Method: getTableName
 * @Description: Looksup given db table name per an entity.
 * @Params: string entName - name of entity
 * @Returns: {string} tableName
 */
function getTableName( entName ){
	for (var i=0; i<EntityRules.ENTITIES.length; i++)
	{
		if (EntityRules.ENTITIES[i].resource == entName) {
			return EntityRules.ENTITIES[i].table_name;
		}
	}
	return false;
}
ValidationGenerator = {};
ValidationGenerator.iterateEntityRuleSets = iterateEntityRuleSets;

return ValidationGenerator;
});