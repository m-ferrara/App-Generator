define(['jquery'], function($){
	// $Util object contains globally used UI 
	var $Util = {};
	 
	$Util.showErrorModal = function(displayText){
		// use jQuery to show modal window with text, and then fade out after 3 seconds
		$(".modal-content").text(displayText);
		$(".modal-container").fadeIn().delay(5000).fadeOut();
	};
	
	return $Util;
});

