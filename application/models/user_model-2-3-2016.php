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
	function authenticate($postArray)
	{
		$uname = $postArray["name"];
		$upwd = $postArray["password"];
		$dbWhere = $this -> db -> where(array("name"=>$uname));
        $dbResult = $this -> db -> get("users");
		if ($dbResult->num_rows()==1)
		{
			$row = $dbResult->row();
			$uid = $row->id;
			$salt = $row->salt;
			$db_pwd = $row->password;
			$upwd_hashed = sha1($upwd.$salt);
			
			//return array("Result"=>"Authentication Success $salt + $db_pwd + $upwd_hashed");
			
			if ($upwd_hashed == $db_pwd)
			{
				return TRUE;  //array("Result"=>"Authentication Success");
			}
			else {
				return array("Result"=>"Invalid Password Provided");
			}
			
		} else {
				return array("Result"=>"User not found.  (e.g. 'invalid info provided, please try again - 3 remaining attempts')");
			
		}
	}
	
	// post creates a user
    function post ($postArray)
    {
    	// prepare password salt
		$size = mcrypt_get_iv_size(MCRYPT_CAST_256, MCRYPT_MODE_CBC);
		$salt = mcrypt_create_iv($size, MCRYPT_RAND);
		$salt = bin2hex($salt);
		
		$postArrayTemp = $postArray;
		$pwdTemp = $postArray["password"];
		$postArrayTemp["salt"]= $salt;	
		$postArrayTemp["password"] = sha1($pwdTemp.$salt);
		
		$postArray = $postArrayTemp;
		
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
        $VldtnRules = array("name" => "alfanum");
        $MandatoryRules = array("name");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("name" => "alfanum");
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
        $VldtnRules = array("id" => "number", "name" => "alfanum", "password" => "alfanum");
        $MandatoryRules = array("id", "name");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("id" => "number", "name" => "alfanum", "password" => "alfanum");
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
        $VldtnRules = array("name" => "alfanum", "password" => "alfanum");
        $MandatoryRules = array("name", "password");
        $MandatoryOrRules = array();
        
        // Sanatization Rules
        $SntnRules = array("name" => "alfanum", "password" => "alfanum");
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