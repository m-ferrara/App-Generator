<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Entity extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("entity_model");
    } 
    function collection_get()
    {
        $modelResult = $this -> entity_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "entity does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
    function index_get()
    {
        $getArray = $this -> assembleRequestPayload('get');
        $validData = $this -> entity_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = $this -> assembleRequestPayload('put');
        $validData = $this -> entity_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> entity_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete($idKey = null, $idVal = null, $tableKey = null, $tableVal = null, $nameKey = null, $nameVal = null, $statusKey = null, $statusVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($tableVal) && strlen($tableVal) > 0) {
            $deleteArray["table"] = $tableVal;
        } 
        if (is_string($nameVal) && strlen($nameVal) > 0) {
            $deleteArray["name"] = $nameVal;
        } 
        if (is_string($statusVal) && strlen($statusVal) > 0) {
            $deleteArray["status"] = $statusVal;
        } 
        $validData = $this -> entity_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity delete request failure."), 200);
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
        
        $name = $this -> get("name");
        if (is_string($name) && strlen($name) > 0) {
            $reqArray["name"] = $name;
        } 
        $status = $this -> get("status");
        if (is_string($status) && strlen($status) > 0) {
            $reqArray["status"] = $status;
        } 
        $table = $this -> get("table");
        if (is_string($table) && strlen($table) > 0) {
            $reqArray["table"] = $table;
        } 
        $id = $this -> get("id");
        if (is_string($id) && strlen($id) > 0) {
            $reqArray["id"] = $id;
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
        $table = $this -> put("table");
        if (is_string($table) && strlen($table) > 0) {
            $reqArray["table"] = $table;
        } 
        $name = $this -> put("name");
        if (is_string($name) && strlen($name) > 0) {
            $reqArray["name"] = $name;
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
        
        $table = $this -> post("table");
        if (is_string($table) && strlen($table) > 0) {
            $reqArray["table"] = $table;
        } 
        $name = $this -> post("name");
        if (is_string($name) && strlen($name) > 0) {
            $reqArray["name"] = $name;
        } 
        $status = $this -> post("status");
        if (is_string($status) && strlen($status) > 0) {
            $reqArray["status"] = $status;
        } 
        return $reqArray;
    } 
} 
/**
 * end of Entity.php
 */