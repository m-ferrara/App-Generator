<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Entity extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("entity_model");
    } 
    function index_get()
    {
        $getArray = array("id" => $this -> get("id"));
        $validData = $this -> entity_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("error" => "Sorry, entity Get request failure (does not exist)."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = array("id" => $this -> put("id"), "table_name" => $this -> put("table_name"), "name" => $this -> put("name"), "required_api_key" => $this -> put("required_api_key"), "rest_complete_status" => $this -> put("rest_complete_status"));
        $validData = $this -> entity_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("error" => "entity put request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = array("table_name" => $this -> post("table_name"), "name" => $this -> post("name"), "required_api_key" => $this -> post("required_api_key"), "rest_complete_status" => $this -> post("rest_complete_status"));
        $validData = $this -> entity_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("error" => "entity post request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete()
    {
        $whereArray = array("id" => $this -> delete("id"));
        $validData = $this -> entity_model -> validate($whereArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_model -> delete($whereArray);
            if (!$modelResult) {
                $this -> response(array("error" => "entity delete request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
} 
/**
 * end of Entity.php
 */