<?php

	session_start();
	include_once("schema_connect.php");

	$username = $_POST["username"];
	$moviename = $_POST["moviename"];
	$movierating = $_POST["movierating"];
	$review = $_POST["review"];
	$movieid = $_POST["movieid"];
	
	if ( !in_array($movierating, array(1,2,3,4,5)) ){
		echo "Ratings must be between 1 - 5!";
		exit;
	}
	
	$result= $db->query("SELECT * FROM user_rating WHERE movieid='$movieid'");
	foreach ($result as $row) {
		$usernamec= $row['username'];
		if($usernamec == $username){
        	echo "Review for movie already exsist!";     
        	exit;
    	}
	}
	
	$success = $db->query( "INSERT INTO user_rating (username, movieid, moviename, movierating, moviereview, date_added) VALUES ('$username', '$movieid', '$moviename', '$movierating', '$review', NOW())");
	
	
	if(!$success)
		echo "failure";
	else
		echo "success";

?>