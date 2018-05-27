<?php

	session_start();
	include_once("schema_connect.php");
	$username = $_POST["username"];
	$subject = $_POST["subject"];


    $result = $db->query("SELECT * FROM user_rating WHERE username='$username' ORDER BY date_added DESC LIMIT 20");
    if($result->num_rows > 0){
        foreach ($result as $row) {
            echo '<ul>';
            echo'<div class="movie '.$row[moviename].'" id="'.$row['movieid'].'">';
            echo '<h5>'.$row['moviename'] . " ".'<span id ="date">'.$row['date_added'] .'</span>'.'</h5>';
            echo '<p>'. $row['moviereview'] . '</p>';
            echo '<p>'."Rating: ". $row['movierating'] .' '. '<span class="fa fa-star checked"></span>'.'</p>';
            echo'</div>';
            echo '</ul>';
        }
    }else{
        echo '<h3>'."Add a Movie!".'</h3>';
    }



?>
