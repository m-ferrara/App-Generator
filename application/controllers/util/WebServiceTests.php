<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WebServiceTests extends CI_Controller
{
    function __construct() 
    {
        parent::__construct();
    }
    
    public function index()
    {
        $this->load->view("util/tests");
    }
    
}
   /* End of WebServiceTests.php */
