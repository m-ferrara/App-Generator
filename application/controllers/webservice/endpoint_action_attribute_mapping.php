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
        $getArray = $this -> assembleRequestPayload('get');
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
        $putArray = $this -> assembleRequestPayload('put');
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
        $postArray = $this -> assembleRequestPayload('post');
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
    function index_delete($idKey = null, $idVal = null, $endpt_idKey = null, $endpt_idVal = null, $action_methodKey = null, $action_methodVal = null, $attr_idKey = null, $attr_idVal = null, $categoryKey = null, $categoryVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($endpt_idVal) && strlen($endpt_idVal) > 0) {
            $deleteArray["endpt_id"] = $endpt_idVal;
        } 
        if (is_string($action_methodVal) && strlen($action_methodVal) > 0) {
            $deleteArray["action_method"] = $action_methodVal;
        } 
        if (is_string($attr_idVal) && strlen($attr_idVal) > 0) {
            $deleteArray["attr_id"] = $attr_idVal;
        } 
        if (is_string($categoryVal) && strlen($categoryVal) > 0) {
            $deleteArray["category"] = $categoryVal;
        } 
        $validData = $this -> endpoint_action_attribute_mapping_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_action_attribute_mapping_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint_action_attribute_mapping delete request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function assembleRequestPayload($requestMethod)
    {
        switch ($requestMethod) {
        case "get": $reqArray = $this -> getAssembler();
            return $reqArray;
            break;
        case "put": $reqArray = $this -> putAssembler();
            return $reqArray;
            break;
        case "post": $reqArray = $this -> postAssembler();
            return $reqArray;
            break;
        } 
    } 
    function getAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $action_method = $this -> get("action_method");
        if (is_string($action_method) && strlen($action_method) > 0) {
            $reqArray["action_method"] = $action_method;
        } 
        $id = $this -> get("id");
        if (is_string($id) && strlen($id) > 0) {
            $reqArray["id"] = $id;
        } 
        $endpt_id = $this -> get("endpt_id");
        if (is_string($endpt_id) && strlen($endpt_id) > 0) {
            $reqArray["endpt_id"] = $endpt_id;
        } 
        return $reqArray;
    } 
    function putAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $id = $this -> put("id");
        if (is_string($id) && strlen($id) > 0) {
            $reqArray["id"] = $id;
        } 
        $endpt_id = $this -> put("endpt_id");
        if (is_string($endpt_id) && strlen($endpt_id) > 0) {
            $reqArray["endpt_id"] = $endpt_id;
        } 
        $attr_id = $this -> put("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
        } 
        $action_method = $this -> put("action_method");
        if (is_string($action_method) && strlen($action_method) > 0) {
            $reqArray["action_method"] = $action_method;
        } 
        $attr_id = $this -> put("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
        } 
        $category = $this -> put("category");
        if (is_string($category) && strlen($category) > 0) {
            $reqArray["category"] = $category;
        } 
        $action_method = $this -> put("action_method");
        if (is_string($action_method) && strlen($action_method) > 0) {
            $reqArray["action_method"] = $action_method;
        } 
        return $reqArray;
    } 
    function postAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $endpt_id = $this -> post("endpt_id");
        if (is_string($endpt_id) && strlen($endpt_id) > 0) {
            $reqArray["endpt_id"] = $endpt_id;
        } 
        $attr_id = $this -> post("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
        } 
        $category = $this -> post("category");
        if (is_string($category) && strlen($category) > 0) {
            $reqArray["category"] = $category;
        } 
        $action_method = $this -> post("action_method");
        if (is_string($action_method) && strlen($action_method) > 0) {
            $reqArray["action_method"] = $action_method;
        } 
        return $reqArray;
    } 
} 
/**
 * end of Endpoint_action_attribute_mapping.php
 */