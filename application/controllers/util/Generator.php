<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Generator extends CI_Controller
{
    function __construct() 
    {
        parent::__construct();
    }
    
    public function Output()
    {
         $data["MakeFiles"] = FALSE;
        $this->load->view("util/output", $data);
    }
    
    public function OutputFiles()
    {
        $data["MakeFiles"] = TRUE;
        $this->load->view("util/output", $data);
    }
}
   /* End of Generator.php */
