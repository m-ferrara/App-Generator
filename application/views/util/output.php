<!DOCTYPE html>
<html>
    <head>
        <?php
        if ($MakeFiles) {
            echo "<script>var MakeFilesFlag = true;</script>";
            $MakeFileMenu = 
                       ' <div id="Make-Files-Commands">
                            <fieldset>
                                <label name="Password" for="secrent">Password</label><input type="text" name="secret" id="secret" />
                                <button class="executemake" >Make Files</button>
                        </div>
                        <div id="Make-Files-Notifications"></div>';
            }
            else {
                echo "<script>var MakeFilesFlag = false;</script>"; 
        }
        ?>
        
        <script data-main="<?php echo base_url().'assets/js/init';?>" type="text/javascript" src="<?php echo base_url().'assets/script/libs/require.js';?>"></script>
    </head>
    <body>

    <?php      
    if ($MakeFiles) {
            echo $MakeFileMenu; 
    }  
     ?>
            
            
         <h2><em>Controllers</em> Generated Code Output:</h2>  
        <textarea id="controllers-output" rows="75" cols="175"></textarea>
    <hr />
        <h2><em>Models</em> Generated Code Output:</h2>
        <textarea id="models-output" rows="75" cols="175"></textarea>
    <hr />
        <h2><em>Backbone.js</em> Generated Code Output:</h2>
        <textarea id="backbone-output" rows="75" cols="175"></textarea>
    <hr />
        <h2><em>Routes</em> Generated Code Output:</h2>
        <textarea id="routes-output" rows="75" cols="175"></textarea>
        </body>
</html>