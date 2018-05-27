<?php

	session_start();
	include_once("schema_connect.php");

	$message_id = $_GET["movieid"];
	
	//check befor adding
	$result = $db->query("SELECT * FROM message_read WHERE movieid='$movieid'");
    if($result->num_rows > 0){
        exit;
    }

	$db->query("INSERT INTO message_read (message_id, date) VALUES ('$message_id', NOW())");

?>