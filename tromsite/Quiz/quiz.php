<?php
$ids = array(59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,117,118,119,120,121,122,123,124,125,126,127);

echo '<div id="quizMessage"></div>';

if(isset($_GET["id"])) {
    $id = $_GET["id"];
} else {
    $answeredIds = explode(',', $_COOKIE['answeredIds']);
    $unansweredIds = array_diff($ids, $answeredIds);
    //var\_dump(implode(',', $unansweredIds));
    $id = $unansweredIds[array_rand($unansweredIds)];
}

//echo 'ID: '.$id; // display the quiz id

if(!isset($id))
    $id = '-1';
else
    echo do_shortcode('[viralQuiz id='.$id.']');

echo '<input type="hidden" id="quizId" value="'.$id.'">';
?>
