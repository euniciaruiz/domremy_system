<?php
  include_once 'ConnectDatabase.php';
  $newTime = $_POST['newTime'];

  $sql = "UPDATE time_tb SET timeOfSlideShow='$newTime' WHERE 1";
  if(mysqli_query($con, $sql)){
    echo json_encode("updated time");
  }else {
    echo json_encode("something went wrong");
  }
 ?>
