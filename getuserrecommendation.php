<?php

	session_start();
	include_once("schema_connect.php");
	include("recommendation.php");
    $username = $_POST["username"];
    
    $movies= $db->query("select * from user_rating");
    $result = $db->query("SELECT * FROM user_rating WHERE username='$username'");
    
    if($result->num_rows == 0){
        echo '<h3>'."No Movie Recommendations".'</h3>';;     
        exit;
    }

    $matrix=array();
    
    while($movie=mysqli_fetch_array($movies))
    {
    	$matrix[$movie['username']][$movie['movieid']]=$movie['movierating'];
    }
    /*echo "<pre>";
    print_r($matrix); 
    echo "</pre>";*/
    $recommedation=array();
    $recommedation=getRecommendation($matrix, $username);
    
    foreach($recommedation as $movie=>$rating)
    	{
    	    if ($rating > 2.5){
    	        $movienames= $db->query("SELECT DISTINCT moviename FROM user_rating WHERE movieid='$movie'");
    	        $moviename=array();
    	        $moviename=mysqli_fetch_array($movienames);
    	        echo '<ul>';
    	        echo '<div class="movierec" id="'.$movie.'">';
                echo '<h5 id="mname" >'. $moviename[0].'</h5>';
                echo '<img id="logo4" src="logo4.png">'.'</img>';
                echo '<p>'."Rating: ". round($rating, 1) .' '. '<span class="fa fa-star checked"></span>'.'</p>';
                echo '</div>';
                echo '</ul>';   
    	    }
    	}
    	
?>