<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller'] = "welcome";
$route['404_override'] = '';

// Utility ROUTES
$route['util/tests'] = "util/WebServiceTests/index";
$route['util/output'] = "util/Generator/output";
$route['util/makefiles'] = "util/Generator/OutputFiles";
$route['util/parse'] = "util/Parse/";


// API Artifacts
// $route['webservice/api/id/(:num)/entities)']  = "webservice/Entity/index/api_id/$1";
// $route['webservice/api/id/(:num)/attribute)']  = "webservice/Attribute/index/api_id/$1";
// $route['webservice/api/id/(:num)/endpoints)']  = "webservice/Endpoints/index/api_id/$1";


/* - - - Api ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/api'] = "webservice/Api";
$route['webservice/apis'] = "webservice/Api/collection";

$route['webservice/api/id/(:num)/attributes']  = "webservice/Api_attr_mapping/index/api_id/$1";
$route['webservice/api/id/(:num)/entities']  = "webservice/Api_entity_mapping/index/api_id/$1";
$route['webservice/api/id/(:num)/endpoints']  = "webservice/Endpoint/index/api_id/$1";

// routes for uri params with catch all
$route['webservice/api/(:any)'] = "webservice/Api/index/$1";
$route['webservice/api/(:any)/(:any)']  = "webservice/Api/index/$1/$2";
$route['webservice/api/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Api/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";
/* - - - Attribute ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/attribute'] = "webservice/Attribute";
$route['webservice/attributes'] = "webservice/Attribute/collection";
$route['webservice/attribute/(:any)/(:any)']  = "webservice/Attribute/index/$1/$2";
$route['webservice/attribute/(:any)'] = "webservice/Attribute/index/$1";
$route['webservice/attribute/(:any)/(:num)/(:any)/(:any)']  = "webservice/Attribute/index/$1/$2/$3/$4";
$route['webservice/attribute/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Attribute/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";
/* - - - Api_attr_mapping ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/api_attr_mapping'] = "webservice/Api_attr_mapping";
$route['webservice/api_attr_mappings'] = "webservice/Api_attr_mapping/collection";
$route['webservice/api_attr_mapping/(:any)/(:any)']  = "webservice/Api_attr_mapping/index/$1/$2";
$route['webservice/api_attr_mapping/(:any)'] = "webservice/Api_attr_mapping/index/$1";
$route['webservice/api_attr_mapping/(:any)/(:num)/(:any)/(:any)']  = "webservice/Api_attr_mapping/index/$1/$2/$3/$4";
$route['webservice/api_attr_mapping/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Api_attr_mapping/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";
/* - - - Api_entity_mapping ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/api_entity_mapping'] = "webservice/Api_entity_mapping";
$route['webservice/api_entity_mappings'] = "webservice/Api_entity_mapping/collection";
$route['webservice/api_entity_mapping/(:any)/(:any)']  = "webservice/Api_entity_mapping/index/$1/$2";
$route['webservice/api_entity_mapping/(:any)'] = "webservice/Api_entity_mapping/index/$1";
$route['webservice/api_entity_mapping/(:any)/(:num)/(:any)/(:any)']  = "webservice/Api_entity_mapping/index/$1/$2/$3/$4";
$route['webservice/api_entity_mapping/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Api_entity_mapping/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";
/* - - - Entity ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/entity'] = "webservice/Entity";
$route['webservice/entities'] = "webservice/Entity/collection";

$route['webservice/entity/id/(:num)/attributes']  = "webservice/Entity_attribute_mapping/index/ent_id/$1";


$route['webservice/entity/(:any)/(:any)']  = "webservice/Entity/index/$1/$2";
$route['webservice/entity/(:any)'] = "webservice/Entity/index/$1";
$route['webservice/entity/(:any)/(:num)/(:any)/(:any)']  = "webservice/Entity/index/$1/$2/$3/$4";
$route['webservice/entity/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Entity/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";
/* - - - Entity_attribute_mapping ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/entity_attribute_mapping'] = "webservice/Entity_attribute_mapping";
$route['webservice/entity_attribute_mappings'] = "webservice/Entity_attribute_mapping/collection";
$route['webservice/entity_attribute_mapping/(:any)/(:any)']  = "webservice/Entity_attribute_mapping/index/$1/$2";
$route['webservice/entity_attribute_mapping/(:any)'] = "webservice/Entity_attribute_mapping/index/$1";
$route['webservice/entity_attribute_mapping/(:any)/(:num)/(:any)/(:any)']  = "webservice/Entity_attribute_mapping/index/$1/$2/$3/$4";
$route['webservice/entity_attribute_mapping/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Entity_attribute_mapping/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";
/* - - - Endpoint_action_attribute_mapping ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/endpoint_action_attribute_mapping'] = "webservice/Endpoint_action_attribute_mapping";
$route['webservice/endpoint_action_attribute_mappings'] = "webservice/Endpoint_action_attribute_mapping/collection";
$route['webservice/endpoint_action_attribute_mapping/(:any)/(:any)']  = "webservice/Endpoint_action_attribute_mapping/index/$1/$2";
$route['webservice/endpoint_action_attribute_mapping/(:any)'] = "webservice/Endpoint_action_attribute_mapping/index/$1";
$route['webservice/endpoint_action_attribute_mapping/(:any)/(:num)/(:any)/(:any)']  = "webservice/Endpoint_action_attribute_mapping/index/$1/$2/$3/$4";
$route['webservice/endpoint_action_attribute_mapping/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Endpoint_action_attribute_mapping/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";
/* - - - Endpoint ROUTES 
* 
* v0.1.0  Notes: Auto-Gen(Thu Jul 02 2015 20:51:37 GMT-0500 (Central Daylight Time))
* - - - */
$route['webservice/endpoint'] = "webservice/Endpoint";
$route['webservice/endpoints'] = "webservice/Endpoint/collection";

$route["webservice/endpoint/id/(:num)/metadata"] = "webservice/Endpoint_action_attribute_mapping/index/endpt_id/$1";
$route['webservice/endpoint/(:any)/(:any)']  = "webservice/Endpoint/index/$1/$2";
$route['webservice/endpoint/(:any)'] = "webservice/Endpoint/index/$1";
$route['webservice/endpoint/(:any)/(:num)/(:any)/(:any)']  = "webservice/Endpoint/index/$1/$2/$3/$4";
$route['webservice/endpoint/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)']  = "webservice/Endpoint/index/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10";



/* End of file routes.php */
/* Location: ./application/config/routes.php */
