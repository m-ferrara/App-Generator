<?php
/**
 * Backbone Acts As URI Router - Displaying Corresponding View Template for Backbone Application 
 * so there are locations partitioned to develop against and match spec.
 */
class Home extends CI_Controller {
    
    function __construct() 
    {
        parent::__construct();
		//$this->session->
    //  $this->load->model('display_model');
    }
	
	function index()
	{
    	$size = mcrypt_get_iv_size(MCRYPT_CAST_256, MCRYPT_MODE_CBC);
		$data["salt"] = mcrypt_create_iv($size, MCRYPT_RAND);
		$data["session_id"] = $this->session->userdata("session_id");
        //$data["data"] = $this->display_model->makeObject();
        $this->load->view("backbone/index", $data); //, $data);
	}
	
}
/*
 * 
 */