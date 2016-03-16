<?php class Api_attr_mapping_model extends CI_Model {
    function __construct()
    {
        parent :: __construct();
    } 
    function get_all ()
    {
        $dbResult = $this -> db -> get("api_attr_mapping");
        return $dbResult -> result();
    } 
    function get ($getArray)
    {
        $dbWhere = $this -> db -> where($getArray);
        $dbResult = $this -> db -> get("api_attr_mapping");
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
        $dbUpdate = $this -> db -> update("api_attr_mapping", $putArray);
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
        $dbInsert = $this -> db -> insert("api_attr_mapping", $postArray);
        if ($dbInsert) {
            return $this -> db -> insert_id();
        } else {
            return false;
        } 
    } 
    function delete ($whereArray)
    {
        $dbWhere = $this -> db -> where($whereArray);
        $dbDelete = $this -> db -> delete("api_attr_mapping");
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
        $VldtnRules = array("id" => "number", "api_id" => "number", "attr_id" => "number");
        $MandatoryRules = array();
        $MandatoryOrRules = array(array("id", "api_id", "attr_id"));
        
        // Sanatization Rules
        $SntnRules = array("id" => "number", "api_id" => "number", "attr_id" => "number");
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
        $VldtnRules = array("id" => "number", "api_id" => "number", "attr_id" => "number");
        $MandatoryRules = array("id", "api_id", "attr_id");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("id" => "number", "api_id" => "number", "attr_id" => "number");
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
        $VldtnRules = array("api_id" => "number", "attr_id" => "number");
        $MandatoryRules = array("api_id", "attr_id");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("api_id" => "number", "attr_id" => "number");
        $UniqueRules = array("AND_CONDITIONAL" => array("TABLE" => "api_attr_mapping", "KEYS" => array("api_id", "attr_id")));
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
 * end of Api_attr_mapping_model.php
 */