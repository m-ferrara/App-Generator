<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Attr_pending_list extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("attr_pending_list_model");
    } 
    function index_get()
    {
        $getArray = array("att_id" => $this -> get("att_id"));
        $validData = $this -> attr_pending_list_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attr_pending_list_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("error" => "Sorry, attr_pending_list Get request failure (does not exist)."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("att_id" => $this -> put("att_id"));
        $putArray = array("att_id" => $this -> put("att_id"), "id" => $this -> put("id"));
        $validData = $this -> attr_pending_list_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attr_pending_list_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("error" => "attr_pending_list put request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = array("att_id" => $this -> post("att_id"),);
        $validData = $this -> attr_pending_list_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attr_pending_list_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("error" => "attr_pending_list post request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete()
    {
        $whereArray = array("att_id" => $this -> delete("att_id"));
        $validData = $this -> attr_pending_list_model -> validate($whereArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> attr_pending_list_model -> delete($whereArray);
            if (!$modelResult) {
                $this -> response(array("error" => "attr_pending_list delete request failure."), 404);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
} 
/**
 * end of Attr_pending_list.php
 */