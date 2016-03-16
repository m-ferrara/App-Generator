<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Attribute extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("attribute_model");
    } 
    function collection_get()
    {
        $modelResult = $this -> attribute_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "attribute does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
    function index_get()
    {
        $getArray = $this -> assembleRequestPayload('get');
        $validData = $this -> attribute_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attribute_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "attribute does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = $this -> assembleRequestPayload('put');
        $validData = $this -> attribute_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attribute_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "attribute put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> attribute_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attribute_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "attribute post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete($idKey = null, $idVal = null, $nameKey = null, $nameVal = null, $typeKey = null, $typeVal = null, $lengthKey = null, $lengthVal = null, $regex_patternKey = null, $regex_patternVal = null, $is_primary_keyKey = null, $is_primary_keyVal = null, $is_uniqueKey = null, $is_uniqueVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($nameVal) && strlen($nameVal) > 0) {
            $deleteArray["name"] = $nameVal;
        } 
        if (is_string($typeVal) && strlen($typeVal) > 0) {
            $deleteArray["type"] = $typeVal;
        } 
        if (is_string($lengthVal) && strlen($lengthVal) > 0) {
            $deleteArray["length"] = $lengthVal;
        } 
        if (is_string($regex_patternVal) && strlen($regex_patternVal) > 0) {
            $deleteArray["regex_pattern"] = $regex_patternVal;
        } 
        if (is_string($is_primary_keyVal) && strlen($is_primary_keyVal) > 0) {
            $deleteArray["is_primary_key"] = $is_primary_keyVal;
        } 
        if (is_string($is_uniqueVal) && strlen($is_uniqueVal) > 0) {
            $deleteArray["is_unique"] = $is_uniqueVal;
        } 
        $validData = $this -> attribute_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attribute_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "attribute delete request failure."), 200);
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
        $id = $this -> get("id");
        if (is_string($id) && strlen($id) > 0) {
            $reqArray["id"] = $id;
        } 
        $api_id = $this -> get("api_id");
        if (is_string($api_id) && strlen($api_id) > 0) {
            $reqArray["api_id"] = $api_id;
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
        $type = $this -> put("type");
        if (is_string($type) && strlen($type) > 0) {
            $reqArray["type"] = $type;
        } 
        $length = $this -> put("length");
        if (is_string($length) && strlen($length) > 0) {
            $reqArray["length"] = $length;
        } 
        $regex_pattern = $this -> put("regex_pattern");
        if (is_string($regex_pattern) && strlen($regex_pattern) > 0) {
            $reqArray["regex_pattern"] = $regex_pattern;
        } 
        $is_primary_key = $this -> put("is_primary_key");
        if (is_string($is_primary_key) && strlen($is_primary_key) > 0) {
            $reqArray["is_primary_key"] = $is_primary_key;
        } 
        $is_unique = $this -> put("is_unique");
        if (is_string($is_unique) && strlen($is_unique) > 0) {
            $reqArray["is_unique"] = $is_unique;
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
        $type = $this -> post("type");
        if (is_string($type) && strlen($type) > 0) {
            $reqArray["type"] = $type;
        } 
        $length = $this -> post("length");
        if (is_string($length) && strlen($length) > 0) {
            $reqArray["length"] = $length;
        } 
        $regex_pattern = $this -> post("regex_pattern");
        if (is_string($regex_pattern) && strlen($regex_pattern) > 0) {
            $reqArray["regex_pattern"] = $regex_pattern;
        } 
        $is_primary_key = $this -> post("is_primary_key");
        if (is_string($is_primary_key) && strlen($is_primary_key) > 0) {
            $reqArray["is_primary_key"] = $is_primary_key;
        } 
        $is_unique = $this -> post("is_unique");
        if (is_string($is_unique) && strlen($is_unique) > 0) {
            $reqArray["is_unique"] = $is_unique;
        } 
        return $reqArray;
    } 
} 
/**
 * end of Attribute.php
 */