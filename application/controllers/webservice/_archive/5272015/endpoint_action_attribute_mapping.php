<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Endpoint_action_attribute_mapping extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("endpoint_action_attribute_mapping_model");
    } 
    function collection_get()
    {
        $modelResult = $this -> endpoint_action_attribute_mapping_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "endpoint_action_attribute_mapping does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
    function index_get()
    {
        $getArray = $this -> endpoint_action_attribute_mapping_model -> assembleRequestParamArray("get");
		
		$endpt_id = $this -> get("endpt_id");
		$action_method = $this -> get("action_method");
		
		if(is_string($action_method) && strlen($action_method) > 0) {
			$getArray["action_method"] = $action_method;	
		}
		
        if(is_string($endpt_id) && strlen($endpt_id) > 0) {
			$getArray["endpt_id"] = $endpt_id;	
		}
		// $newArray = array_splice($getArray, 0,1);
		// $getArray = $newArray;
		//$this->response($newArray);
		
        $validData = $this -> endpoint_action_attribute_mapping_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_action_attribute_mapping_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint_action_attribute_mapping does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = array("id" => $this -> put("id"), "endpt_id" => $this -> put("endpt_id"), "action_method" => $this -> put("action_method"), "attr_id" => $this -> put("attr_id"), "category" => $this -> put("category"));
        $validData = $this -> endpoint_action_attribute_mapping_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_action_attribute_mapping_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint_action_attribute_mapping put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = array("endpt_id" => $this -> post("endpt_id"), "action_method" => $this -> post("action_method"), "attr_id" => $this -> post("attr_id"), "category" => $this -> post("category"));
        $validData = $this -> endpoint_action_attribute_mapping_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_action_attribute_mapping_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint_action_attribute_mapping post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete()
    {
        $whereArray = array("id" => $this -> delete("id"));
        $validData = $this -> endpoint_action_attribute_mapping_model -> validate($whereArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_action_attribute_mapping_model -> delete($whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint_action_attribute_mapping delete request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
} 
/**
 * end of Endpoint_action_attribute_mapping.php
 */