<?php class User_model extends CI_Model {
    function __construct()
    {
        parent :: __construct();
    } 
    function get_all ()
    {
        $dbResult = $this -> db -> get("users");
        return $dbResult -> result();
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

    function get ($getArray)
    {
        $dbWhere = $this -> db -> where($getArray);
        $dbResult = $this -> db -> get("users");
        if ($dbResult -> num_rows() == 1) {
            return $dbResult -> row();
        } else if ($dbResult -> num_rows() > 1) {
            return $dbResult -> result();
        } else {
            return false;
        } 
    } 
    function put ($putArray, $whereArray)
    {
        $dbWhere = $this -> db -> where($whereArray);
        $dbUpdate = $this -> db -> update("users", $putArray);
        if ($dbUpdate) {
            $affectedRows = $this -> db -> affected_rows();
            if ($affectedRows == 0) {
                return false;
            } else {
                return true;
            } 
        } else {
            return false;
        } 
    } 
    function post ($postArray)
    {
        $dbInsert = $this -> db -> insert("users", $postArray);
        if ($dbInsert) {
            return $this -> db -> insert_id();
        } else {
            return false;
        } 
    } 
    function delete ($whereArray)
    {
        $dbWhere = $this -> db -> where($whereArray);
        $dbDelete = $this -> db -> delete("users");
        $affectedRows = $this -> db -> affected_rows();
        if ($affectedRows == 0) {
            return false;
        } else {
            return true;
        } 
    } 
    function validate($requestPayload , $requestMethod)
    {
        switch ($requestMethod) {
        case "get": $validStatus = $this -> getValidator($requestPayload);
            return $validStatus;
            break;
        case "put": $validStatus = $this -> putValidator($requestPayload);
            return $validStatus;
            break;
        case "post": $validStatus = $this -> postValidator($requestPayload);
            return $validStatus;
            break;
        case "delete": $validStatus = $this -> deleteValidator($requestPayload);
            return $validStatus;
            break;
        } 
    } 
    function getValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("email" => "email");
        $MandatoryRules = array("email");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("email" => "email");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $MandatoryOrRules, $SntnRules, $UniqueRules);
        if ($validator -> validate($RequestPayload)) {
            $sanatizedPayload = $validator -> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator -> getJSON());
        } 
    } 
    function putValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("id" => "number", "email" => "email", "password" => "alfanum");
        $MandatoryRules = array("id", "email");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("id" => "number", "email" => "email", "password" => "alfanum");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $MandatoryOrRules, $SntnRules, $UniqueRules);
        if ($validator -> validate($RequestPayload)) {
            $sanatizedPayload = $validator -> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator -> getJSON());
        } 
    } 
    function postValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("email" => "email", "password" => "alfanum");
        $MandatoryRules = array("email", "password");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("email" => "email", "password" => "alfanum");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $MandatoryOrRules, $SntnRules, $UniqueRules);
        if ($validator -> validate($RequestPayload)) {
            $sanatizedPayload = $validator -> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator -> getJSON());
        } 
    } 
    function deleteValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("id" => "number");
        $MandatoryRules = array("id");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("id" => "number");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $MandatoryOrRules, $SntnRules, $UniqueRules);
        if ($validator -> validate($RequestPayload)) {
            $sanatizedPayload = $validator -> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator -> getJSON());
        } 
    } 
} 
/**
 * end of User_model.php
 */