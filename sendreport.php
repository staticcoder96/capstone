<?php

	session_start();
	include_once("schema_connect.php");

	$username = $_POST["username"];
	$movieid = $_POST["movieid"];
	$reason = $_POST["reason"];
	
	
	
    $r = $db->query("SHOW TABLE STATUS WHERE name='message'");
    $new_message_id = $r->fetch_assoc()["Auto_increment"];
	$success = $db->query( "INSERT INTO message (username, movieid, subject, date_sent) VALUES ('$username', '$movieid', '$reason', NOW())");
	
	
	if(!$success)
		echo "failure";
	else
		echo "success";

?>