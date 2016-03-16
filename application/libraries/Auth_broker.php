<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Auth_broker Class
 *
 *
 * @category	Libraries
 * @author		Matt Ferrara
 * @link		
 * @license		MIT
 * @version		2.1
 */

class Auth_broker extends CI_Controller
{
	private $ci;

	public function __construct() {
		$this -> ci = &get_instance();
	}
	
	// @TODO: Write login, authentication, authorization and token management functions
	function lookup_user_by_email($userEmail)
	{
		if (is_string($userEmail))
		{
			$this->ci->db->where(array('email'=>$userEmail));
			$userQry = $this->ci->db->get('users');
			if ($userQry->num_rows() === 1)
			{
				// return user array.
				$userResults = $userQry->result_array();
				$userLookupResult = array();
				$userLookupResult["id"] = $userResults->id;
				$userLookupResult["email"] = $userResults->email;
				$userLookupResult["password"] = $userResults->password;
				
				return $userLookupResult;
			}
			else {
				return -1;
			}
		}
	}
	
	function authenticate_user($userEmail, $password)
	{
		$userLookup = $this->lookup_user_by_email($userEmail);
		if (is_numeric($userLookup) && $userLookup === -1) 
		{
			return false; 
		}
		// create hash of password
		$pwdField = $userLookup["password"];
		$pwdArr = split(":", $pwdField);
		// @TODO: Check array extracted property types
		$salt = $pwdArr[0];
		// @TODO: Check array extracted property types
		$storedHash = $pwdArr[1];
		
		$userHash = crypt($password, $salt);

		
		if (strcmp($userHash, $storedHash) === 0)
		{
			return true;
		}
		else {
			return false;
		}
			
	}
	
	function generate_access_token($uId)
	{
	// create a token containing claims and user info
		if (is_numeric($uId))
		{
			
			// generate anonymous user token	
		}
		
		$token_object = Array();
		$token_object["user_id"] = $uId;
		$token_object["access_token"] = random_string('alnum', 8);
		
		return $token_object;
	}
	
	/*
	 * @TODO: document
	 */
	function convert_to_delimited_string( $tokenObject )
	{
		if (is_array($tokenObject))
		{
			// encode using secret key in config - set as cookie value to be read upon request rcv
			//	return $this->ci->encrypt->encode(http_build_query($tokenObject,"?","&"));
			
			$tokenObjectString = http_build_query($tokenObject,"&");
			return $tokenObjectString;
		}
		else {
			throw new InvalidArgumentException("Token Object argument not of array type", 1);
			return false;
		}
	}
	
	/*
	 * @TODO: document
	 */
	function lookup_user_roles( $uId )
	{
		if (is_array($tokenObject))
		{
			return $this->ci->encrypt->encode(http_build_query($tokenObject,"?","&"));
			
			$tokenObjectString = implode("&", $tokenObject);
			return $tokenObjectString;
		}
		else {
			throw new InvalidArgumentException("Token Object argument not of array type", 1);
			return false;
		}
	}
	
	function hash_password( $strPassword )
	{
		
	}
}

/* End of Auth_broker.php
 * location: ../application/libraries/Auth_broker.php
 */