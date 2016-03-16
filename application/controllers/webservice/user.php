<?php defined("BASEPATH") OR exit("No direct script access allowed");
require APPPATH . "/libraries/REST_Controller.php";
class User extends REST_Controller {
    function __construct()
    {
        parent :: __construct();
        $this -> load -> model("user_model");
    } 
	/*
	 * custom - not auto-generated
	 */
	function authenticate_post()
    {
    	// temp begin
    	$accessToken = $this->auth_broker->generate_access_token(5);
    	$tokenString = $this->auth_broker->convert_to_delimited_string($accessToken);
		//$tokenString = $this->encrypt->decode("xFjGCHMSELJNYFlXZIl0y7yZJC+LwS6y0KQWzKj+j1T6LgMZxNFSsCaKzyMivUzDEDmUm+BEqOdiZEzb9zZQLw==");
		
		$this->response($tokenString, 200);
    	// end temp
    	
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> user_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> user_model -> authenticate($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "user post request failure."), 200);
            } else {
            	// call token service for access_token_object, set userdata
            	// $this->token_service->
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function collection_get()
    {
        $modelResult = $this -> user_model -> get_all();
        if (!$modelResult) {
            $this -> response(array("success" => "false", "errorMsg" => "user does not exist."), 200);
        } else {
            $this -> response($modelResult, 200);
        } 
    } 
    function index_get()
    {
        $getArray = $this -> assembleRequestPayload('get');
        $validData = $this -> user_model -> validate($getArray, "get");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> user_model -> get($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "user does not exist."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_put()
    {
        $whereArray = array("id" => $this -> put("id"));
        $putArray = $this -> assembleRequestPayload('put');
        $validData = $this -> user_model -> validate($putArray, "put");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> user_model -> put($sanatizedPayload, $whereArray);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "user put request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_post()
    {
        $postArray = $this -> assembleRequestPayload('post');
        $validData = $this -> user_model -> validate($postArray, "post");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> user_model -> post($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "user post request failure."), 200);
            } else {
                $this -> response($modelResult, 200);
            } 
        } 
    } 
    function index_delete($idKey = null, $idVal = null, $emailKey = null, $emailVal = null, $passwordKey = null, $passwordVal = null, $date_joinedKey = null, $date_joinedVal = null)
    {
        
        // Assign Params if Detected
        $deleteArray = array();
        
        if (is_string($idVal) && strlen($idVal) > 0) {
            $deleteArray["id"] = $idVal;
        } 
        if (is_string($emailVal) && strlen($emailVal) > 0) {
            $deleteArray["email"] = $emailVal;
        } 
        if (is_string($passwordVal) && strlen($passwordVal) > 0) {
            $deleteArray["password"] = $passwordVal;
        } 
        if (is_string($date_joinedVal) && strlen($date_joinedVal) > 0) {
            $deleteArray["date_joined"] = $date_joinedVal;
        } 
        $validData = $this -> user_model -> validate($deleteArray, "delete");
        if (!$validData["isValid"]) {
            $this -> response(json_decode($validData["errorMsg"]));
        } else {
            $sanatizedPayload = $validData["payload"];
            $modelResult = $this -> user_model -> delete($sanatizedPayload);
            if (!$modelResult) {
                $this -> response(array("success" => "false", "errorMsg" => "user delete request failure."), 200);
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
        
        $email = $this -> get("email");
        if (is_string($email) && strlen($email) > 0) {
            $reqArray["email"] = $email;
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
        $email = $this -> put("email");
        if (is_string($email) && strlen($email) > 0) {
            $reqArray["email"] = $email;
        } 
        $password = $this -> put("password");
        if (is_string($password) && strlen($password) > 0) {
            $reqArray["password"] = $password;
        } 
        return $reqArray;
    } 
    function postAssembler()
    {
        
        // Assign Params if Detected
        $reqArray = array();
        
        $email = $this -> post("email");
        if (is_string($email) && strlen($email) > 0) {
            $reqArray["email"] = $email;
        } 
        $password = $this -> post("password");
        if (is_string($password) && strlen($password) > 0) {
            $reqArray["password"] = $password;
        } 
        return $reqArray;
    } 
} 
/**
 * end of User.php
 */