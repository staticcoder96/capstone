<?php

	session_start();
	include_once("schema_connect.php");
	$moviename = $_POST["movieid"];
	
	$result = $db->query("SELECT * FROM user_rating WHERE movieid='$moviename' ORDER BY date_added DESC");
	echo '<h3>'."Reviews".'</h3>';
	if($result->num_rows > 0){
	    foreach ($result as $row) {
	    $username= $row['username'];
	    $result2 = $db->query("SELECT Distinct firstname, lastname FROM user WHERE username='$username'");
    	    foreach ($result2 as $row2) {
    	        echo '<ul id="reviewlist">';
                echo '<h5>'.'<span class="fa fa-user" id="user" style="font-size:25px">'.'</span>'. '  '.$row2['firstname'] . " ". $row2['lastname'].'   ' .'<span id ="date">'.$row['date_added'] .'</span>'.'</h5>';
                echo '<p>'. $row['moviereview'] . '</p>';
                echo '<p>'."Rating: ". $row['movierating'] .' '. '<span class="fa fa-star checked"></span>'.'</p>';
                echo '<button type="button" class="report '. $row['username'].'" id="'. $row['movieid'].'">Report</button>';
                echo '</ul>';
                
    	    }
	    }
	}else{
	    echo ("Nothing return from table");
	}
	
	
?>