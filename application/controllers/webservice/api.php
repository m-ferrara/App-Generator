<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Api extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("api_model");
    } 
    function collection_get()
    {
        $modelResult = $this -> api_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "api does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
	
	function collection_latest_get()
    {
        $modelResult = $this -> api_model -> get_latest();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "api does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
	
    function index_get()
    {
        $getArray = $this -> assembleRequestPayload('get');
        $validData = $this -> api_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = $this -> assembleRequestPayload('put');
        $validData = $this -> api_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> api_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete($idKey = null, $idVal = null, $nameKey = null, $nameVal = null, $db_nameKey = null, $db_nameVal = null, $statusKey = null, $statusVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($nameVal) && strlen($nameVal) > 0) {
            $deleteArray["name"] = $nameVal;
        } 
        if (is_string($db_nameVal) && strlen($db_nameVal) > 0) {
            $deleteArray["db_name"] = $db_nameVal;
        } 
        if (is_string($statusVal) && strlen($statusVal) > 0) {
            $deleteArray["status"] = $statusVal;
        } 
        $validData = $this -> api_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api delete request failure."), 200);
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
        $name = $this -> get("name");
        if (is_string($name) && strlen($name) > 0) {
            $reqArray["name"] = $name;
        } 
        $db_name = $this -> get("db_name");
        if (is_string($db_name) && strlen($db_name) > 0) {
            $reqArray["db_name"] = $db_name;
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
        $name = $this -> put("name");
        if (is_string($name) && strlen($name) > 0) {
            $reqArray["name"] = $name;
        } 
        $db_name = $this -> put("db_name");
        if (is_string($db_name) && strlen($db_name) > 0) {
            $reqArray["db_name"] = $db_name;
        } 
        $status = $this -> put("status");
        if (is_string($status) && strlen($status) > 0) {
            $reqArray["status"] = $status;
        } 
        return $reqArray;
    } 
    function postAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $name = $this -> post("name");
        if (is_string($name) && strlen($name) > 0) {
            $reqArray["name"] = $name;
        } 
        $db_name = $this -> post("db_name");
        if (is_string($db_name) && strlen($db_name) > 0) {
            $reqArray["db_name"] = $db_name;
        } 
        return $reqArray;
    } 
} 
/**
 * end of Api.php
 */