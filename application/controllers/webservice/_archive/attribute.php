<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class Attribute extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this->load -> model("attribute_model");
    } 
    function index_get()
    {
        $getArray = array("id" => $this->get("id"));
        $validData = $this->attribute_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this->response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this->attribute_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this->response(array("error" => "Sorry, attribute Get request failure (does not exist)."), 404);
            } else {
                $this->response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this->put("id"));
        $putArray = array("id" => $this->put("id"), "name" => $this->put("name"), "type" => $this->put("type"), "length" => $this->put("length"), "regex_pattern" => $this->put("regex_pattern"), "is_primary_key" => $this->put("is_primary_key"), "is_unique" => $this->put("is_unique"));
        $validData = $this->attribute_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this->response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this->attribute_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this->response(array("error" => "attribute put request failure."), 404);
            } else {
                $this->response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        //die(var_dump(file_get_contents('php://input')));
        $postArray = array(
            "name" => $this->post("name")
            ,"type" => $this->post("type")
            ,"length" => $this->post("length")
            ,"regex_pattern" => $this->post("regex_pattern")
            ,"is_primary_key" => $this->post("is_primary_key")
            ,"is_unique" => $this->post("is_unique")
        );
      //  $this->response($postArray, 222);
        $validData = $this->attribute_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this->response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this->attribute_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this->response(array("error" => "attribute post request failure."), 404);
            } else {
                $this->response($modelResult, 200);
            } 
        } 
    } 
    function index_delete()
    {
        $whereArray = array("id" => $this->delete("id"));
        $validData = $this->attribute_model -> validate($whereArray, "delete");
        if (!$validData["isValid"]) {
            $this->response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this->attribute_model -> delete($whereArray);
            if (!$modelResult) {
                $this->response(array("error" => "attribute delete request failure."), 404);
            } else {
                $this->response($modelResult, 200);
            } 
        } 
    } 
} 
/**
 * end of Attribute.php
 */