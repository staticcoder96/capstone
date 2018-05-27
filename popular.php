<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<?php

	session_start();
	include_once("schema_connect.php");
	$count=0;
    $rating_list= array();
	
	$result= $db->query("SELECT Distinct movieid FROM user_rating");
	foreach($result as $row){
	    (float)$totalrating = 0.00;
	    $ratingnumber = 0;
	    $movieid= $row['movieid'];
	    $result2= $db->query("SELECT movierating FROM user_rating WHERE movieid= '$movieid'");
	    foreach ($result2 as $row2) {
	        $rating= $row2['movierating'];
	        $totalrating += $rating;
	        $ratingnumber += 1;
	    }
	    (float)$average_rating= number_format((float)$totalrating/$ratingnumber, 2, '.', '');
	    $rating_list[$movieid]= $average_rating;
	}
	
	array_multisort($rating_list,SORT_DESC);
	
	foreach($rating_list as $movie=>$rating)
    	{
    	    if ($rating > 3){
    	    	$movienames= $db->query("SELECT DISTINCT moviename FROM user_rating WHERE movieid='$movie'");
    	        $moviename=array();
    	        $moviename=mysqli_fetch_array($movienames);
    	        $count=$count+1;
    	        echo '<ul>';
                echo '<div class="popmovies"><p class="hotmovie" id="'.$movie.'">'.'<span id="numbering">'.'#'.''.$count.'</span>'.'  '.'<span id="popmname">'. $moviename[0].'</span>' .'<span class="fa fa-trophy" id="trophy"style="font-size:30px">'.'</span>'. ' </br>  ' .'Rating: '. round($rating, 1) .' '. '<span class="fa fa-star checked"></span>'.'</p></div>';
                echo '</ul>';   
                
    	    }
    	}
	    
	
?>