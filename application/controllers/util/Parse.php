<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Parse extends REST_Controller
{
    /*
     *
     *
    */
    function index_post()
    {
        $formatting_cofig = "--space-after-if --space-after-switch --space-after-while --space-before-start-angle-bracket --space-after-end-angle-bracket --one-true-brace-function-declaration --glue-amperscore --change-shell-comment-to-double-slashes-comment --force-large-php-code-tag --force-true-false-null-contant-lowercase --align-equal-statements";
       // $csvInput = $this->post('csv');
      //  $csvInput = html_entity_decode($csvInput);
		$data = json_decode(file_get_contents('php://input'), true);
		
		$csvInput = $data["csv"];
        $csvInput = html_entity_decode($csvInput);
		
	//	return $this->response((object)array("response"=>$data["csv"]), 200);

        $output_dir = $this->post('output_dir');

// DEBUG ONLY
        // return $this->response((object)array("response"=>"Request for: ".$output_dir." Successful"), 200);
// END DEBUG

        if (is_null($csvInput) || $csvInput == "") {
            return $this->response((object)array("response"=>"Bad Request.  No input detected."), 400);
        }
        // have csvFile as String.
        // TODO:  Parse CSV String into array.
        // File,FileContents pattern -> File=FileName, FileContents=Contents
        // Place files in folder - with incrementing versioning.
        // Return Success or Error Http Response to indicate Result.
        $GeneratedCode = str_getcsv($csvInput, '|');

        $CodeArrayCount = count($GeneratedCode);
        // Will return Count of 1 if content not delimited in required format.
        if ($CodeArrayCount <= 1 || is_null($CodeArrayCount)) {
            return $this->response((object)array("response"=>"Bad Request.  Must be CSV format, pipe | delimited."), 400);
        }

        // $isnull = is_null($CodeArrayCount);
        // $isnullString = (string)"haha";
        // return $this->response($isnullString.$CodeArrayCount, 200);


        // first, make request directory for versioning purposes
        $datetime = new DateTime();
        $yearMonthDay = (string)$datetime->format('Y-m-d');

        $HourMin = (string)$datetime->format("H-i");
        $HourMinDash = $HourMin; //str_replace(":", "-", $HourMin);

        if ($output_dir == "" || is_null($output_dir) || empty($output_dir))
        {
            $dirname = "output-".$yearMonthDay.$HourMinDash."\\";
        }
        else {
            $dirname = $output_dir."\\output-".$yearMonthDay.$HourMinDash."\\";
        }


        $dir_location = 'C:\\Bitnami\\wampstack-5.4.36-0\\apache2\htdocs\\App-Generator\\util-output\\'.$dirname;
        $dir_formatted_location = 'C:\\Bitnami\\wampstack-5.4.36-0\\apache2\htdocs\\App-Generator\\util-output\\'.$dirname."\\formatted\\";

        if (!file_exists($dir_formatted_location)) {
            mkdir($dir_formatted_location, 0777, true);
        }
        $i = $CodeArrayCount;
		// parse csv for name|code pairs
        while ($i >= 2)
        {
            $i = $i - 2;

            $CodeFileName = $GeneratedCode[$i];
            // quirky, but attribute.js is having the extension stripped somewhere, so, add it back
            if (strpos($CodeFileName,"Attribute") === 0)
            {
                if (!strpos($CodeFileName, "Collection"))
                {
                    $CodeFileName = "Attribute.js";
                }
            }
            $CodeFileContents = ($GeneratedCode[($i + 1)]);
            // another bizarre quirk, wtf compooter!?
            if (strpos($CodeFileContents, "Clxn"))
            {
                 $tempContents = $CodeFileContents;
                 $NewContents = str_replace("Clxn", "Collection", $tempContents);
               // return $this->response((object)array("response"=>$NewContents), 200);
                 $CodeFileContents = $NewContents;
                 // $CodeFileName = str_replace($CodeFileContents, "Cllctn", "Collection");
            }
           // return $this->response($CodeFileContents, 200);
            // now use file system php util to create file in directory and input contents
           file_put_contents($dir_location.$CodeFileName, $CodeFileContents, LOCK_EX);

          usleep(400);

           if ($output_dir != "backbone") {
           	 usleep(100);
               // Now, Format Code using phpCB beautifier and Execute command to Save File and File Contents into
               // directory dir_location.
               $cmdLinePhpBeautify = "C:\\Users\\suite651-tablet\\Desktop\\Tools\\phpCodeBeautifier\\phpCB.exe ".$formatting_cofig." ".$dir_location.$CodeFileName.">".$dir_formatted_location.$CodeFileName;

          //    return $this->response((object)array("response"=>$cmdLinePhpBeautify), 200);

               exec($cmdLinePhpBeautify);
            }
          }


         if ($output_dir == "backbone")
         {
         	 usleep(100);
              $ListOfFilesAsArray = scandir($dir_location);
            // return $this->response(array("response"=>count($ListOfFilesAsArray)), 200);
             for ($i = 0; $i<count($ListOfFilesAsArray); $i++)
             {
                if (strpos($ListOfFilesAsArray[$i],".js"))
                {
                   exec("C:\\ProgramData\\chocolatey\\lib\\nodejs.commandline.0.10.35\\tools\\uglifyjs ".$dir_location.$ListOfFilesAsArray[$i]." -b -o " .$dir_formatted_location.$ListOfFilesAsArray[$i]. "");
                }
             }
          }

        return $this->response((object)array("response"=>"Request for: ".$output_dir." Successful"), 200);
    }

    function index_get()
    {

        return $this->response(json_encode("Test Get Success: Sanity Check Complete"), 200);
    }
}
/* end of Citation.php */
