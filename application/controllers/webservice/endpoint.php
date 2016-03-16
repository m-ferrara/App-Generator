<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Endpoint extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("endpoint_model");
    } 
    function collection_get()
    {
        $modelResult = $this -> endpoint_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "endpoint does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
    function index_get()
    {
        $getArray = $this -> assembleRequestPayload('get');
        $validData = $this -> endpoint_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = $this -> assembleRequestPayload('put');
        $validData = $this -> endpoint_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> endpoint_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete($idKey = null, $idVal = null, $api_idKey = null, $api_idVal = null, $ent_idKey = null, $ent_idVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($api_idVal) && strlen($api_idVal) > 0) {
            $deleteArray["api_id"] = $api_idVal;
        } 
        if (is_string($ent_idVal) && strlen($ent_idVal) > 0) {
            $deleteArray["ent_id"] = $ent_idVal;
        } 
        $validData = $this -> endpoint_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> endpoint_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "endpoint delete request failure."), 200);
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
        $ent_id = $this -> get("ent_id");
        if (is_string($ent_id) && strlen($ent_id) > 0) {
            $reqArray["ent_id"] = $ent_id;
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
        $ent_id = $this -> put("ent_id");
        if (is_string($ent_id) && strlen($ent_id) > 0) {
            $reqArray["ent_id"] = $ent_id;
        } 
        $api_id = $this -> put("api_id");
        if (is_string($api_id) && strlen($api_id) > 0) {
            $reqArray["api_id"] = $api_id;
        } 
        return $reqArray;
    } 
    function postAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $ent_id = $this -> post("ent_id");
        if (is_string($ent_id) && strlen($ent_id) > 0) {
            $reqArray["ent_id"] = $ent_id;
        } 
        $api_id = $this -> post("api_id");
        if (is_string($api_id) && strlen($api_id) > 0) {
            $reqArray["api_id"] = $api_id;
        } 
        return $reqArray;
    } 
} 
/**
 * end of Endpoint.php
 */