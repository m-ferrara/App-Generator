// This script runs code generation functions and outputs them to textarea on the output page.
define(['jQuery','ControllersGenerator','ModelsGenerator','EntityRules','BackboneGenerator'], function($, CONTROLLERS, MODELS, EntityRules, BackboneGenerator) {
	//console.log( typeof $ );
	var j = $.noConflict();
	var initialize = function() {
		window.AGGREGATE_CSV_CODE_OUTPUT_ARRAY = [];
 	// Controllers - outputs csv

            var outputcontrollers = CONTROLLERS.BUILD_CRUD();

            AGGREGATE_CSV_CODE_OUTPUT_ARRAY.push({
            	"output_dir" : "controllers",
            	"csv" : outputcontrollers
            	});

            j("#controllers-output").val( JSON.stringify(outputcontrollers) );
	// Models - outputs csv
            var outputmodels = MODELS.BUILD_CRUD();

           AGGREGATE_CSV_CODE_OUTPUT_ARRAY.push({
            	"output_dir" : "models",
            	"csv" : outputmodels
            	});


            j("#models-output").val( JSON.stringify(outputmodels) );
    // BackboneJS - outputs csv
    		var outputBackbone = BackboneGenerator.GenerateCSV();

    		AGGREGATE_CSV_CODE_OUTPUT_ARRAY.push({
            	"output_dir": "backbone",
            	"csv" : outputBackbone
            	});


    		j("#backbone-output").val( JSON.stringify(outputBackbone));

	// Routes Outputs php config code
            var output_stream ='';
            var ENTITIES_CT = EntityRules.REST.length;
            for (var i = 0; i < ENTITIES_CT; i++)
            {
                var ENTITY = EntityRules.REST[i].ENTITY;
                var EntityPluralRoot = (ENTITY.substr((ENTITY.length - 1),(ENTITY.length)).toUpperCase() == "Y") ? ENTITY.substr(0,(ENTITY.length - 1)) + "ie" : ENTITY;
                var capitalized = EntityRules.REST[i].ENTITY.substr(0,1).toUpperCase() + EntityRules.REST[i].ENTITY.substr(1);

                output_stream += "/* - - - " + capitalized  + " ROUTES \n* \n* v0.1.0  Notes: Auto-Gen(" + Date().toString() + ")\n* - - - */\n";
                output_stream += "$route['webservice/" + ENTITY + "'] = \"webservice/" + capitalized + "\";\n";
                output_stream += "$route['webservice/" + EntityPluralRoot + "s'] = \"webservice/" + capitalized + "\/collection\";\n";
                output_stream += "$route['webservice/" + ENTITY + "/(:any)/(:any)']  = \"webservice/" + capitalized + "/index/$1/$2\";\n";
                output_stream += "$route['webservice/" + ENTITY + "/(:any)'] = \"webservice/" + capitalized + "\/index/$1\";\n";
                output_stream += "$route['webservice/" + ENTITY + "/(:any)/(:num)/(:any)/(:any)']  = \"webservice/" + capitalized + "/index/$1/$2/$3/$4\";\n";
                output_stream += "$route['webservice/" + ENTITY + "/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = \"webservice/" + capitalized + "/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10\";\n";
            };

            j("#routes-output").val( output_stream );


		// Code Generated and Output to Page Textarea for viewing.
		//
		//   //|||||  //||||||\\  ||||||\\  ||||||||		 //
		//	|||		  ||      ||  ||	 || ||			    //
		// 	|||		  ||	  ||  ||	 || ||||||	 \\	   //
		//	|||		  ||	  ||  ||     || ||		  \\  //
		//	 \\|||||  \\||||||//  ||||||//  |||||||	   \\//
		//
		// Now, if MakeFilesFlag true --> Make POST request to util/Parse endpoint to generate files.

			if (MakeFilesFlag) {
				var PromptSecret = prompt("Enter Secret Key");
				j("input#secret").val(PromptSecret);


				// bind executemake button click to execute http ajax requests
				j('.executemake').on("click", function(e){
						j(".executemake").prop("disabled", true);
						j("input#secret").prop("disabled", true);

					// get secret value
					var secret = j("input#secret").val();
					if (secret == "" || secret != "ninja") {
						j("input#secret").prop("disabled", false);
						j(".executemake").prop("disabled", false);

						var responseHtmlString = "<p class='needs-key-msg' style='background:orange;color:#000;font-weight:bold;'>Need To Enter Valid Secret</p>";
						return j("#Make-Files-Notifications").append(responseHtmlString);
					}

					if (j('.needs-key-msg')){
						j('.needs-key-msg').remove();
					}
					// make call to event-handler: makeFiles()
					makeFiles(secret, AGGREGATE_CSV_CODE_OUTPUT_ARRAY);


				});

				// bind enter keypress to executemake click
				j("input#secret").keypress(function (ev) {
            		var keycode = (ev.keyCode ? ev.keyCode : ev.which);
           		 	if (keycode == '13') {
            	   		 j('.executemake').click();
            		}
       			});
			}

	};
	// End of initialize function
// makeFiles issues requests to Server to supply csv for transformation into php files,
// which are outputted in the util-ouput directory or optionally specified directory name in the util-output directory.
	var makeFiles = function(secret, AGGREGATE_CSV_CODE_OUTPUT_ARRAY) {


		if (secret == "ninja") {

					for (var u = 0; u<AGGREGATE_CSV_CODE_OUTPUT_ARRAY.length; u++)
					{
						try
						{
							j.ajax({
								url: $APP_URL_ROOT + "util/Parse",
								type: 'POST',
								dataType : 'json',
								data: JSON.stringify(AGGREGATE_CSV_CODE_OUTPUT_ARRAY[u]),
								contentType: "application/json",
								headers: {"X-API-KEY" : secret},
								success: function(_res){
									console.log( _res );
									var responseHtmlString = "<p style='background:green;color:#000;font-weight:bold;'>" + _res.response + "</p>";
									j("#Make-Files-Notifications").append(responseHtmlString);
								},
								error: function(_res){

									console.log( _res );
									var responseHtmlString = "<p style='background:orange;color:#000;font-weight:bold;'>" + _res.message + "</p>";
									j("#Make-Files-Notifications").append(responseHtmlString);
								}
							});
							
							sleep(100);
						  
						}
						catch (err)
						{
							console.log(err);
						}
					}

					setTimeout(function(){
						j("input#secret").prop("disabled", false);
						j(".executemake").prop("disabled", false);
					}, 5000);
			} else {
				j("input#secret").prop("disabled", false);
				j(".executemake").prop("disabled", false);
				return;
			}

	};

	return {
	  initialize: initialize
	};
});

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }
