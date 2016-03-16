<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Entity_rest_profile extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("entity_rest_profile_model");
    } 
    function index_get()
    {
        $getArray = array("ent_id" => $this -> get("ent_id"));
        $validData = $this -> entity_rest_profile_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_rest_profile_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("error" => "Sorry, entity_rest_profile Get request failure (does not exist)."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("ent_id" => $this -> put("ent_id"));
        $putArray = array("ent_id" => $this -> put("ent_id"), "method" => $this -> put("method"), "complete_status" => $this -> put("complete_status"));
        $validData = $this -> entity_rest_profile_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_rest_profile_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("error" => "entity_rest_profile put request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = array("ent_id" => $this -> post("ent_id"), "method" => $this -> post("method"), "complete_status" => $this -> post("complete_status"));
        $validData = $this -> entity_rest_profile_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_rest_profile_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("error" => "entity_rest_profile post request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete()
    {
        $whereArray = array("ent_id" => $this -> delete("ent_id"));
        $validData = $this -> entity_rest_profile_model -> validate($whereArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> entity_rest_profile_model -> delete($whereArray);
            if (!$modelResult) {
                $this -> response(array("error" => "entity_rest_profile delete request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
} 
/**
 * end of Entity_rest_profile.php
 */