<?php

	session_start();
	include_once("schema_connect.php");
	$subject = $_POST["subject"];


if($subject == "all"){
       	// get messages for specified recipient
    $result = $db->query("SELECT * FROM message ORDER BY date_sent DESC");
    
    if($result->num_rows > 0){
        echo '<ul>';
    foreach ($result as $row) {
      //echo '<li>' . $row['name'] . ' is ruled by ' . $row['head_of_state'] . '</li>';
      $mes_id= $row['id'];
      $result2 = $db->query("SELECT * FROM message_read WHERE message_id= '$mes_id'");//should be message id
      foreach ($result2 as $row2) {
          $date_read= $row2['date'];
      }
      if($result2->num_rows > 0){
        
        echo'<ul id="repmess">';
      	echo '<p class="messages" id="'.$row['id'].'">' . "Reporter ID: ".$row['movieid'] . '</br>'."Date sent: ".$row['date_sent']. "</br>" .'Date read: '.$date_read .'</p>';
        echo '<h6 id="status">'."(read)".'</h6>';
        echo'</ul>';
      }else{
      	
        echo'<ul id="repmess">';
      	echo '<p class="messages" id="'.$row['id'].'">' . "Reporter ID: ".$row['movieid'] . '</br>'."Date sent: ".$row['date_sent']. '</p>';
      	echo '<h6 id="status">'."(unread)".'</h6>';
        echo'</ul>';
      }
    }
    echo '</ul>';
    }else{
        echo ("No Message");
    } 
}else{
    $result = $db->query("SELECT * FROM message WHERE id='$subject' ORDER BY date_sent DESC");
    
    foreach ($result as $row) {
       if($row['id'] == $subject){
           
            echo'<ul id="repmess2">';
            echo '<h6>'."User Name: ". $row['username'] . '</h6>';
      	    echo '<p class="messages" id="'.$row['id'].'">' . "Reporter ID: ".$row['movieid'] . '</br>'."Date sent: ".$row['date_sent'].'</p>';
            echo '<h6>'."Report: " . '</h6>';
            echo '<p>'. $row['subject'] . '</p>';
            echo'</ul>';
            echo '<button class= "view '.$row['username'].'" id="'.$row['movieid'].'">view</button><button class= "delete" id="'.$row['id'].'">Delete</button></br>';
            echo '<button id="return">Return to inbox</button>';
            
        }  
    }
    
}

?>
