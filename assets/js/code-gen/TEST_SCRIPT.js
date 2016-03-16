// This script runs code generation functions and outputs them to textarea on the output page.
define(['jQuery','EntityRules','AttributeRules','datatables'], function($,EntityRules, AttributeRules) {
		
	var j = $.noConflict();
	
	var initialize = function() {
		var PromptSecret = prompt("Enter Secret Key");
		j("input#secret").val(PromptSecret);
		if (PromptSecret == "ninja") 
		{
			var testPassCt = 0, testFailCt = 0;

	// Iterate each Entity, Make POST, PUT, GET, DELETE Requests, Report Back Results in UI table.
            var output_stream ='';
            var ENTITIES_CT = EntityRules.REST.length;
				var RequestObjectArray = [];

            EntityRules.REST.forEach(function(entityObj, index) {
            	//for (var i = 0; i < ENTITIES_CT; i++)
           // {
                var entityObj = entityObj,
				  entName = entityObj.ENTITY,
				  methodSet = entityObj.METHOD,
				  getSet = methodSet.GET,
				  putSet = methodSet.PUT,
				  postSet = methodSet.POST,
				  deleteSet = methodSet.DELETE,
				  idRecentlyCreated = 0;
				
				// RequestObjectArray stores objects containing entName, actionMethod, resultStatus, reqUri, reqData, respData
								  
                var capitalized = entityObj.ENTITY.substr(0,1).toUpperCase() + entityObj.ENTITY.substr(1);
				
				// POST Request
				var requestDetailObject = new Object();
				var that = this;
				j.ajax({
					url: "/App-Generator/webservice/" + entName,
					method: "post",
					data : createSampleRequest(postSet, null),
					headers: {"X-API-KEY" : PromptSecret},
					contentType : "application/json",
					success: function(resData){
						if (resData > 0)
						{
							idRecentlyCreated = resData;
						}
						testPassCt++;
						that.requestDetailObject = {
							"entName" : entName,
							"actionMethod" : "POST",
							"resultStatus" : "SUCCESS",
							"reqUri" : this.url,
							"reqData" : JSON.parse(this.data),
							"resData" : resData
						};
						
					},
					error: function(resData) {
						testFailCt++;
						that.requestDetailObject = {
							"entName" : entName,
							"actionMethod" : "POST",
							"resultStatus" : "ERROR",
							"reqUri" : this.url,
							"reqData" : JSON.parse(this.data),
							"resData" : resData
						};
					},
					complete : function() {
						updateResultsTable(testPassCt, testFailCt);
						RequestObjectArray.push(that.requestDetailObject);
					}
				}).done(function(){
					// PUT Request
					var requestDetailObject = new Object();
					var that = this;
					j.ajax({
						url: "/App-Generator/webservice/" + entName,
						method: "put",
						headers: {"X-API-KEY" : PromptSecret},
						data : createSampleRequest(putSet, idRecentlyCreated),
						contentType : "application/json",
						success: function(resData){
							testPassCt++;
							that.requestDetailObject = {
							"entName" : entName,
							"actionMethod" : "PUT",
							"resultStatus" : "SUCCESS",
							"reqUri" : this.url,
							"reqData" : JSON.parse(this.data),
							"resData" : resData
						};
						},
						error: function(resData) {
							testFailCt++;
						    that.requestDetailObject = {
							"entName" : entName,
							"actionMethod" : "PUT",
							"resultStatus" : "ERROR",
							"reqUri" : this.url,
							"reqData" : JSON.parse(this.data),
							"resData" : resData
						};
						},
						complete : function() {
							updateResultsTable(testPassCt, testFailCt);
							RequestObjectArray.push(that.requestDetailObject);
						}
					}).done(function(){
						// GET Request
						var getURL = "/App-Generator/webservice/" + entName + "/" + createSampleRequestUrlParams(getSet, idRecentlyCreated);
						var requestDetailObject = new Object();
						var that = this;
						j.ajax({
							url: getURL,
							method: "get",
							headers: {"X-API-KEY" : PromptSecret},
							// data : createSampleRequest(getSet),
							// contentType : "application/json",
							success: function(resData){
								testPassCt++;
								that.requestDetailObject = {
									"entName" : entName,
									"actionMethod" : "GET",
									"resultStatus" : "SUCCESS",
									"reqUri" : this.url,
									"reqData" : this.url,
									"resData" : resData
								};
							},
							error: function(resData) {
								testFailCt++;
								that.requestDetailObject = {
									"entName" : entName,
									"actionMethod" : "GET",
									"resultStatus" : "ERROR",
									"reqUri" : this.url,
									"reqData" : this.url,
									"resData" : resData
								};
							},
							complete : function() {
								updateResultsTable(testPassCt, testFailCt);
								RequestObjectArray.push(that.requestDetailObject);
							}
						}).done(function(){
							// DELETE Request
							// delay start to allow server to finish processing
							//sleep(1500);
							var deleteURL = "/App-Generator/webservice/" + entName + "/" + createSampleRequestUrlParams(deleteSet, idRecentlyCreated);
							var requestDetailObject = new Object();
							var that = this;
							j.ajax({
								url: deleteURL,
								method: "delete",
								headers: {"X-API-KEY" : PromptSecret},
								// data : createSampleRequest(deleteSet),
								// contentType : "application/json",
								success: function(resData){
									testPassCt++;
								    that.requestDetailObject = {
									"entName" : entName,
									"actionMethod" : "DELETE",
									"resultStatus" : "SUCCESS",
									"reqUri" : this.url,
									"reqData" : this.url,
									"resData" : resData
								};
								},
								error: function(resData) {
									testFailCt++;
								    that.requestDetailObject = {
									"entName" : entName,
									"actionMethod" : "DELETE",
									"resultStatus" : "ERROR",
									"reqUri" : this.url,
									"reqData" : this.url,
									"resData" : resData
								};
								},
								complete : function() {
									updateResultsTable(testPassCt, testFailCt);
									RequestObjectArray.push(that.requestDetailObject);
								}
							}).done(function(){

								  if (index == (ENTITIES_CT-1)){
										setTimeout(function(){
											applyDataTable(RequestObjectArray);
										},2000);
									}
							});
						});
					});
				});
           });

            
       	}
       	else
       	{
       		alert("invalid secret, try again");
       		location.reload();
//       		j("input#run-tests").after("<p>Invalid Secret provided - Tests will fail authentication.</p>");
       	}

       };
       
   function updateResultsTable(testPassCt, testFailCt){
       	// append aggregate results count of success and fail
       	j("table#all-results > tbody > tr > td > span.passed-tests").html( "<b>" + testPassCt + "</b>" );
       	j("table#all-results > tbody > tr > td > span.failed-tests").html( "<b>" + testFailCt + "</b>" );
   }
   
       // // bind request detail hide/show functions
       // j(document).on("click", "td.show-details > div.btn", function(){
       	 // var showDetails = j(this).parent().parent(), hiddenDetails = showDetails.next();
       	 // showDetails.hide();
       	 // hiddenDetails.show();
       // });
       // j(document).on("click", "td.hidden-details > div.btn", function(){
       	// var detailsRow = j(this).parent().parent(), showDetails = detailsRow.prev();
       	 // showDetails.show();
       	 // detailsRow.hide();
       // });

// helper methods below
function ajaxSuccessHandler(data, method, name){
	appendResultStatus( "<tr class='success'><td></td><td>" + name + "</td><td>" + method + "</td><td>Success</td></tr>");
	}
function ajaxErrorHandler(data, method, name){
	appendResultStatus( "<tr class='warning'><td></td><td>" + name + "</td><td>" + method + "</td><td>Failed</td></tr>");
	}

/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<table class="table table-borderd" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Name:</td>'+
            '<td>'+ d.entName +'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Method:</td>'+
            '<td>'+ d.actionMethod +'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Uri:</td>'+
            '<td>'+ d.reqUri +'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Request data:</td>'+
            '<td><pre>'+ JSON.stringify(d.reqData, null, 2) +'</pre></td>'+
        '</tr>'+
        '<tr>'+
            '<td>Response data:</td>'+
            '<td><pre>'+ JSON.stringify(d.resData, null, 2) +'</pre></td>'+
        '</tr>'+
    '</table>';
}
function appendResultStatus( msg ) {
	j("table#results").append(msg);
}

 
function applyDataTable(RequestObjectArray){
	var dt = j("table#results").DataTable( {
		"data" : RequestObjectArray,
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "entName" },
            { "data": "actionMethod" },
            { "data": "resultStatus" },
        ],
        "pageLength": 25,
        "order": [[1, 'asc']],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	        switch(aData["resultStatus"]){
	            case 'SUCCESS':
	            	j(nRow).removeClass();
	                j(nRow).addClass("success");
	                break;
	            case 'ERROR':
	            	j(nRow).removeClass();
	                j(nRow).addClass("warning");
	                break;
	        }
        }
    });
     

    // Array to track the ids of the details displayed rows
    var detailRows = [];
 
    // Add event listener for opening and closing details
    j('#results tbody').on('click', 'td.details-control', function () {
        var tr = j(this).closest('tr');
        var row = dt.row( tr );
        var idx = j.inArray( tr.attr('id'), detailRows );
 
        if ( row.child.isShown() ) {
            tr.removeClass( 'shown' );
            row.child.hide();
 
            // Remove from the 'open' array
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'shown' );
            row.child( format( row.data() ) ).show();
 
            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    });
    
    j(document).on("click", "tr > td > div#show-hide-details", function(){
    	
    	if (j(this).hasClass("details-shown")) {
    		j(this).text("Show Details").removeClass("details-shown");
    	} else {
    		j(this).text("Hide Details").addClass("details-shown");
    	}
    	
	    j("tr>td.details-control").each(function(el,i){
			j(this).trigger("click");
		});
 	});
 	
 
    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        j.each( detailRows, function ( i, id ) {
            j('#'+id+' td.details-control').trigger( 'click' );
        });
    });
}
// createSampleRequest
/*
 *  @returns json serialized version of object containing key val pairs expected per method set.
 */
function createSampleRequest( methodSet, idRecentlyCreated ) {
	// returns object with key value, values determined by validation rule.
	var retObj = {};
	var attributes = aggregateAttributes( methodSet );
		
	attributes.forEach(function( attr, index ) {
		var attrRules = attributeRules( attr ),
		attrRule = attrRules.validation,
		attrVal = populateValue(attrRule);
		if (attr == "id" && idRecentlyCreated > 0) {
		// if ((attr == "id" || attr == "api_id" || attr == "ent_id" || attr == "endpt_id") && idRecentlyCreated > 0) {
			attrVal = idRecentlyCreated;
		}
		retObj[attr] = attrVal;
	});
		
	return JSON.stringify(retObj);
}
// createSampleRequestUrlParams
/*
 *  @returns url params in "key/val" url format.
 */
function createSampleRequestUrlParams( methodSet, idRecentlyCreated ) {
	// returns object with key value, values determined by validation rule.
	var retString = "";
	var attributes = (methodSet.REQUIRED_ALWAYS.length > 0 ) ? methodSet.REQUIRED_ALWAYS : methodSet.REQUIRED_OR[0]; //aggregateAttributes( methodSet );
	var attrReqOr = (methodSet.REQUIRED_ALWAYS.length > 0 ) ? false : true; //aggregateAttributes( methodSet );


	attributes.forEach(function( attr, index ) {
		// only include one and only from required_or sets.
		if (attrReqOr && index >= 1) {
			return false;
		}
		var attrRules = attributeRules( attr ),
		attrRule = attrRules.validation,
		attrVal = populateValue(attrRule);
		
		if (attr == "id" && idRecentlyCreated > 0) {
		// if ((attr == "id" || attr == "api_id" || attr == "ent_id" || attr == "endpt_id") && idRecentlyCreated > 0) {
			attrVal = idRecentlyCreated;
		}
		
		retString += encodeURIComponent(attr) + '/' + encodeURIComponent(attrVal) + '/';
	});
		
	return retString;
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
/*	 *  @method populateValue
	 * @params validationRule
	 * @returns value based type of validationRule
	 * 
	 */
function populateValue( validationRule ) {
	// return value for validationRule
	//	"{"number":"number","alfanum":"alfanum","anything":"anything"}"

	switch( validationRule ) {
		case 'number' :
		  return Math.floor(Math.random() * 100);
		  break;
		case 'alfanum' :
		  return genString(5);
		  break;
		case 'anything' :
		  return genString(8);
		  break;
		default :
		  return false;
	}
}
/* @METHOD   attributeRules
 * @PARAMS   attribute { String } Given attribute of an Entity's HTTP-Request Payload Body.
 * @RETURNS   Rules object - of Specified Attribute, ie 'u_id' returns 
 *										{attribute : 'u_id', dataType : 'integer', regex: null}
*/
function genString(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }
      
	return {
	  initialize: initialize
	};
});
