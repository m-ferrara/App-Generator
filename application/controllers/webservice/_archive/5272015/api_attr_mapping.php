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
        $getArray = array("api_id" => $this -> get("api_id"));
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
        $whereArray = array("api_id" => $this -> put("api_id"));
        $putArray = array("id" => $this -> put("id"), "api_id" => $this -> put("api_id"), "attr_id" => $this -> put("attr_id"));
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
        $postArray = array("api_id" => $this -> post("api_id"), "attr_id" => $this -> post("attr_id"));
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
    function index_delete()
    {
        $whereArray = array("api_id" => $this -> delete("api_id"));
        $validData = $this -> api_attr_mapping_model -> validate($whereArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> api_attr_mapping_model -> delete($whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "api_attr_mapping delete request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
} 
/**
 * end of Api_attr_mapping.php
 */