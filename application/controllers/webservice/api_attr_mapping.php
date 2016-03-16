<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Api_attr_mapping extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("api_attr_mapping_model");
    } 
    function collection_get()
    {
        $modelResult = $this -> api_attr_mapping_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "api_attr_mapping does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
    function index_get()
    {
        $getArray = $this -> assembleRequestPayload('get');
        $validData = $this -> api_attr_mapping_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_attr_mapping_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api_attr_mapping does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = $this -> assembleRequestPayload('put');
        $validData = $this -> api_attr_mapping_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_attr_mapping_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api_attr_mapping put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> api_attr_mapping_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_attr_mapping_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api_attr_mapping post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete($idKey = null, $idVal = null, $api_idKey = null, $api_idVal = null, $attr_idKey = null, $attr_idVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($api_idVal) && strlen($api_idVal) > 0) {
            $deleteArray["api_id"] = $api_idVal;
        } 
        if (is_string($attr_idVal) && strlen($attr_idVal) > 0) {
            $deleteArray["attr_id"] = $attr_idVal;
        } 
        $validData = $this -> api_attr_mapping_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_attr_mapping_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api_attr_mapping delete request failure."), 200);
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
        
        $id = $this -> get("id");
        if (is_string($id) && strlen($id) > 0) {
            $reqArray["id"] = $id;
        } 
        $api_id = $this -> get("api_id");
        if (is_string($api_id) && strlen($api_id) > 0) {
            $reqArray["api_id"] = $api_id;
        } 
        $attr_id = $this -> get("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
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
        $api_id = $this -> put("api_id");
        if (is_string($api_id) && strlen($api_id) > 0) {
            $reqArray["api_id"] = $api_id;
        } 
        $attr_id = $this -> put("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
        } 
        return $reqArray;
    } 
    function postAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $api_id = $this -> post("api_id");
        if (is_string($api_id) && strlen($api_id) > 0) {
            $reqArray["api_id"] = $api_id;
        } 
        $attr_id = $this -> post("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
        } 
        return $reqArray;
    } 
} 
/**
 * end of Api_attr_mapping.php
 */