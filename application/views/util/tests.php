<!DOCTYPE html>
<head>
  <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="../assets/css/custom.css">
  <link rel="stylesheet" href="../assets/css/jquery.dataTables.min.css">
<!-- kick off js init -->
  <script data-main="../assets/js/tests-init" type="text/javascript" src="../assets/script/libs/require.js"></script>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <header>
          <h1>Web Service Test Reporting</h1>
          <h3>Run test requests to determine functional status</h3>
        </header>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <table id="all-results" class="table">
		   <tbody>
	          <tr>
	            <td>Pass/Fail:</td>
	            <td>
	            	<span class="passed-tests"> </span> 
	            	/ 
	            	<span class="failed-tests"> </span>
            	</td>
	          </tr>
	          <tr>
	          	<td class="show-details"><div id="show-hide-details" class="btn btn-default">Show All Details</div></td>
	          </tr>
	        </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <!-- <table id="results" class="table">
          <tr>
            <th>Entity (Resource)</th>
            <th>Method</th>
            <th>Successful</th>
          </tr>
        </table> -->
    <table id="results" class="results table">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Request Method</th>
                <th>Status</th>
            </tr>
        </thead>
 
        <tfoot>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Request Method</th>
                <th>Status</th>
            </tr>
            <!-- <tr>
                <th></th>
                <th>Name</th>
                <th>Method</th>
                <th>URI</th>
                <th>Request Data</th>
                <th>Response Data</th>
            </tr> -->
        </tfoot>
     </table>
     <br/>
<footer>
	<header>
		<h1>Tests Util Page</h1>
	</header>
</footer>
      </div>
    </div>
  </div>
</body>