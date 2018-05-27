<?php

	session_start();
	include_once("schema_connect.php");
	$reviewid = $_POST["reviewid"];
	

	$success = $db->query( "DELETE FROM user_rating where id='$reviewid'");

    if ( $success === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record ";
    }

	
?>