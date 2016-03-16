<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Entity_attribute_mapping extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("entity_attribute_mapping_model");
    } 
    function collection_get()
    {
        $modelResult = $this -> entity_attribute_mapping_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "entity_attribute_mapping does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
    function index_get()
    {
        $getArray = $this -> assembleRequestPayload('get');
        $validData = $this -> entity_attribute_mapping_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_attribute_mapping_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity_attribute_mapping does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = $this -> assembleRequestPayload('put');
        $validData = $this -> entity_attribute_mapping_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_attribute_mapping_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity_attribute_mapping put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> entity_attribute_mapping_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_attribute_mapping_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity_attribute_mapping post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete($idKey = null, $idVal = null, $attr_idKey = null, $attr_idVal = null, $ent_idKey = null, $ent_idVal = null, $is_primary_keyKey = null, $is_primary_keyVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($attr_idVal) && strlen($attr_idVal) > 0) {
            $deleteArray["attr_id"] = $attr_idVal;
        } 
        if (is_string($ent_idVal) && strlen($ent_idVal) > 0) {
            $deleteArray["ent_id"] = $ent_idVal;
        } 
        if (is_string($is_primary_keyVal) && strlen($is_primary_keyVal) > 0) {
            $deleteArray["is_primary_key"] = $is_primary_keyVal;
        } 
        $validData = $this -> entity_attribute_mapping_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_attribute_mapping_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "entity_attribute_mapping delete request failure."), 200);
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
        $ent_id = $this -> get("ent_id");
        if (is_string($ent_id) && strlen($ent_id) > 0) {
            $reqArray["ent_id"] = $ent_id;
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
        $attr_id = $this -> put("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
        } 
        $ent_id = $this -> put("ent_id");
        if (is_string($ent_id) && strlen($ent_id) > 0) {
            $reqArray["ent_id"] = $ent_id;
        } 
        $is_primary_key = $this -> put("is_primary_key");
        if (is_string($is_primary_key) && strlen($is_primary_key) > 0) {
            $reqArray["is_primary_key"] = $is_primary_key;
        } 
        return $reqArray;
    } 
    function postAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $attr_id = $this -> post("attr_id");
        if (is_string($attr_id) && strlen($attr_id) > 0) {
            $reqArray["attr_id"] = $attr_id;
        } 
        $ent_id = $this -> post("ent_id");
        if (is_string($ent_id) && strlen($ent_id) > 0) {
            $reqArray["ent_id"] = $ent_id;
        } 
        $is_primary_key = $this -> post("is_primary_key");
        if (is_string($is_primary_key) && strlen($is_primary_key) > 0) {
            $reqArray["is_primary_key"] = $is_primary_key;
        } 
        return $reqArray;
    } 
} 
/**
 * end of Entity_attribute_mapping.php
 */