<?php
  $ids = array(59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,117,118,119,120,121,122,123,124,125,126,127);

  echo '<div id="quizMessage"></div>';

  if(isset($_GET["id"])) {
      // Escape user input for HTML tags and cast to integer
      $id = (int) htmlspecialchars($_GET["id"]);
  } else {
      // Check if the 'answeredIds' cookie is present on the user's session
      if(!isset($_COOKIE['answeredIds'])){
        // If the cookie value is empty, initialize an empty '$answeredIds' array
        $answeredIds = [];
      } else {
        // Otherwise, get the correct user answers via the 'answeredIds' cookie.
        $answeredIds = explode(',', $_COOKIE['answeredIds']);
      }

      // Get the unanswered questions ids by calculating the difference between the two arrays, '$answeredIds' and '$ids'.
      $unansweredIds = array_diff($ids, $answeredIds);

      // Debug line
      //var\_dump(implode(',', $unansweredIds));

      // Finally, set the quiz id to a pseudo-randomly selected value from the '$unansweredIds' array that was calculated earlier.
      $id = $unansweredIds[array_rand($unansweredIds)];
  }

  // Debug line
  //echo 'ID: '.$id; // Display the quiz id

  if(!isset($id))
      $id = '-1';
  else
      echo do_shortcode('[viralQuiz id='.htmlspecialchars($id).']'); // Wordpress function call

  // If, for some reason 'quiz id' is processed somewhere else on the code,
  // make sure to use htmlspecialchars before displaying its contents to the DOM.
  echo '<input id="quizId" type="hidden" value="'. htmlspecialchars($id) .'">';
?>
