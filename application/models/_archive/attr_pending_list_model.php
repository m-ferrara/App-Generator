<?php class Attr_pending_list_model extends CI_Model {
    function __construct()
    {
        parent :: __construct();
    } 
    function get ($getArray)
    {
        $dbWhere = $this-> db-> where($getArray);
        $dbResult = $this-> db-> get("attr_pending_list");
        return $dbResult-> result();
    } 
    function put ($putArray, $whereArray)
    {
        $dbWhere = $this-> db-> where($whereArray);
        $dbUpdate = $this-> db-> update("attr_pending_list", $putArray);
        if ($dbUpdate) {
            return true;
        } else {
            return false;
        } 
    } 
    function post ($postArray)
    {
        $dbInsert = $this-> db-> insert("attr_pending_list", $postArray);
        if ($dbInsert) {
            return $this-> db-> insert_id();
        } else {
            return false;
        } 
    } 
    function delete ($whereArray)
    {
        $dbWhere = $this-> db-> where($whereArray);
        $dbDelete = $this-> db-> delete("attr_pending_list");
    } 
    function validate($requestPayload , $requestMethod)
    {
        switch ($requestMethod) {
        case "get": $validStatus = $this-> getValidator($requestPayload);
            return $validStatus;
            break;
        case "put": $validStatus = $this-> putValidator($requestPayload);
            return $validStatus;
            break;
        case "post": $validStatus = $this-> postValidator($requestPayload);
            return $validStatus;
            break;
        case "delete": $validStatus = $this-> deleteValidator($requestPayload);
            return $validStatus;
            break;
        } 
    } 
    function getValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array();
        $MandatoryRules = array();
        
        // Sanatization Rules
        $SntnRules = array();
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator-> validate($RequestPayload)) {
            $sanatizedPayload = $validator-> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator-> getJSON());
        } 
    } 
    function putValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array();
        $MandatoryRules = array();
        
        // Sanatization Rules
        $SntnRules = array();
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator-> validate($RequestPayload)) {
            $sanatizedPayload = $validator-> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator-> getJSON());
        } 
    } 
    function postValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("att_id" => "number");
        $MandatoryRules = array("att_id");
        
        // Sanatization Rules
        $SntnRules = array("att_id" => "number");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator-> validate($RequestPayload)) {
            $sanatizedPayload = $validator-> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator-> getJSON());
        } 
    } 
    function deleteValidator($RequestPayload)
    {
        
        // Validation Rules
        $VldtnRules = array("att_id" => "number");
        $MandatoryRules = array("att_id");
        
        // Sanatization Rules
        $SntnRules = array("att_id" => "number");
        $UniqueRules = array();
        $validator = new Custom_Validator($VldtnRules, $MandatoryRules, $SntnRules, $UniqueRules);
        if ($validator-> validate($RequestPayload)) {
            $sanatizedPayload = $validator-> sanatize($RequestPayload);
            return array("isValid" => true, "payload" => $sanatizedPayload);
        } else {
            return array("isValid" => false, "errorMsg" => $validator-> getJSON());
        } 
    } 
} 
/**
 * end of Attr_pending_list_model.php
 */