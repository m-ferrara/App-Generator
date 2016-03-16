<!-- _layout.jade acts as wrapper containing header-footer -->
<!--              static elements of the view.-->
<!DOCTYPE html>
<html lang="en">
  <head>
  	<title>Api Generator: Rest Maker</title>
    <link rel="stylesheet" href="../../assets/bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" href="../../assets/css/custom.css"/>
  </head>
  <script> var userSessionId = '<?php 
  	echo $session_id;
  	?>';
  	
  	var salt = '<?php echo $salt; ?>';
  </script>
  <body>
  	<!-- <header>
	    <div class="container">
	      <div class="row col-sm-12 col-md-12">
	      	<hgroup>
	      		<h1> Rest Maker v1.0</h1>
	        	<h2 class="intro">Create and Manage RESTful API Web-Services.</h4>
	      	</hgroup>
	      </div>
	    </div>
	</header>   -->  
    <div class="container">
      <div class="row col-sm-12 col-md-12">
        <h1>App-Generator v1.0</h1>
        <h3 class="intro">Create and Manage RESTful API Web-Services.</h3>
        <hr>
      </div>
    </div>
    <div id="api-tabs" class="container">
      <div class="row col-sm-12 col-md-12 col-lg-12">
        <ul role="tablists" class="app-menu nav nav-tabs">
          <!-- <li class="active"><a href="#aps" role="tab" data-toggle="tab">Existing APIs</a></li>
          <li><a href="#apicreate" role="tab" data-toggle="tab">Create New API</a></li> -->
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="row col-sm-12 col-md-12">
        <div class="tab-content">
          <div class="tab-pane active">
            <!-- <div class="row col-sm-12 col-md-12 instruction"><span class="alert alert-info">Select an API from the list below to manage related Entities, Attributes and Endpoints.</span></div> -->
            <div class="row col-sm-12 col-md-12"><!-- Handlebars iterate through existing Apis, if none, display Add Api link. -->
              <div id="content"></div>
              <div id="tab-content"></div>
            </div>
          </div>
          <div class="container">
            <div class="row col-sm-12 col-md-12">
              <p class="text-center">API/Rest Maker Footer 2015</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-container">
    	<div class="modal-content"><!-- content goes here dynamically --></div>
    </div>
            <script data-main="<?php echo base_url().'assets/script/init';?>" type="text/javascript" src="<?php echo base_url().'assets/script/libs/require.js';?>"></script>
  </body>
</html>