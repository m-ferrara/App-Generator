<?php class Attribute_model extends CI_Model {
    function __construct()
    {
        parent :: __construct();
    } 
    function get ($getArray)
    {
        $dbWhere = $this->db->where($getArray);
        $dbResult = $this->db->get("attribute");
        return $dbResult->row();
    } 
    function put ($putArray, $whereArray)
    {
        $dbWhere = $this->db->where($whereArray);
        $dbUpdate = $this->db->update("attribute", $putArray);
        if ($dbUpdate) {
            return true;
        } else {
            return false;
        } 
    } 
    function post ($postArray)
    {
        $dbInsert = $this->db->insert("attribute", $postArray);
        if ($dbInsert) {
            return $this->db->insert_id();
        } else {
            return false;
        } 
    } 
    function delete ($whereArray)
    {
        $dbWhere = $this->db->where($whereArray);
        $dbDelete = $this->db->delete("attribute");
    } 
    function validate($requestPayload , $requestMethod)
    {
        switch ($requestMethod) {
        case "get": $validStatus = $this->getValidator($requestPayload);
            return $validStatus;
            break;
        case "put": $validStatus = $this->putValidator($requestPayload);
            return $validStatus;
            break;
        case "post": $validStatus = $this->postValidator($requestPayload);
            return $validStatus;
            break;
        case "delete": $validStatus = $this->deleteValidator($requestPayload);
            return $validStatus;
            break;
        } 
    } 
    function getValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("id" => "number", "name" => "alfanum");
        $MandatoryRules = array("id");
        
        // Sanatization Rules
        $SntnRules = array("id" => "number", "name" => "alfanum");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator->validate($RequestPayload)) {
            $sanatizedPayload = $validator->sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator->getJSON());
        } 
    } 
    function putValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("id" => "number", "name" => "alfanum", "type" => "alfanum", "length" => "number", "regex_pattern" => "anything", "is_primary_key" => "number", "is_unique" => "number");
        $MandatoryRules = array("id");
        
        // Sanatization Rules
        $SntnRules = array("id" => "number", "name" => "alfanum", "type" => "alfanum", "length" => "number", "regex_pattern" => "anything", "is_primary_key" => "number", "is_unique" => "number");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator->validate($RequestPayload)) {
            $sanatizedPayload = $validator->sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator->getJSON());
        } 
    } 
    function postValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("name" => "alfanum", "type" => "alfanum", "length" => "number", "regex_pattern" => "anything", "is_primary_key" => "number", "is_unique" => "number");
        $MandatoryRules = array("name");
        
        // Sanatization Rules
        $SntnRules = array("name" => "alfanum", "type" => "alfanum", "length" => "number", "regex_pattern" => "anything", "is_primary_key" => "number", "is_unique" => "number");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator->validate($RequestPayload)) {
            $sanatizedPayload = $validator->sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator->getJSON());
        } 
    } 
    function deleteValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("id" => "number");
        $MandatoryRules = array("id");
        
        // Sanatization Rules
        $SntnRules = array("id" => "number");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator->validate($RequestPayload)) {
            $sanatizedPayload = $validator->sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator->getJSON());
        } 
    } 
} 
/**
 * end of Attribute_model.php
 */