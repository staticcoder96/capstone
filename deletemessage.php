<?php

	session_start();
	include_once("schema_connect.php");
	$message_id = $_POST["messageid"];
	

	$success = $db->query( "DELETE FROM message where id='$message_id'");
	$success2 = $db->query( "DELETE FROM message_read where message_id='$message_id'");

    if ( $success === TRUE and $success2 === TRUE) {
        echo "Message deleted successfully";
    } else {
        echo "Error deleting record ";
    }

	
?>