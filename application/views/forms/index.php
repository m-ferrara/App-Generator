<!DOCTYPE HTML>
<html>
    <head>
        <style>
            ul.entities {
                list-style:none;
            }
            ul li {
                display: inline;
                padding: 0px 4px;
                margin: 0px 4px;
            }
        </style>
    </head>
    <body>
        <?php
            //print_r($entities);
            $output = "";
         //   $entitiesArray = json_decode(json_encode($entities), true);
          //  echo json_encode($entities);
        //    foreach ($entitiesArray as $entArr) {
                foreach ($entities as $entity) 
                {
                   //$output  .= "<ul><li>" +  $entity->name +  $entity->mysql_table +  $entity->required_api_key + "</li></ul>";

                 $output .= "<ul class='entities'><li>name:  ";
                 $output .= $entity["name"] . "_name";
                 $output .= "</li>";
                 $output .= "<li>mysql-table:  ";
                 $output  .= $entity["mysql_table"];
                 $output  .= "</li>";
                 $output  .= "<li>api key required?  ";
                 $output  .= ($entity["required_api_key"]) ? "true" : "false";
                 $output  .= "</li>";
                 $output  .= "<li>Id:  ";
                 $output  .= $entity["id"];
                 $output  .= "</li>";
                 $output  .= "</ul>";
                 
                }
            
            
            echo $output;
            //echo $output;
        ?>
    </body>
</html>
