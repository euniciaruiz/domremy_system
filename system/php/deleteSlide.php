<?php
  include_once 'ConnectDatabase.php';
  $id = $_POST['imageId'];

  $sql = "UPDATE slide_tb SET slideValidity=0 WHERE slideId= ?";
  if($secure = $con->prepare($sql)){
    $secure->bind_param("i", $id);
    $secure->execute();
    echo json_encode("Success");
  }else{
    echo json_encode("error");
  }
 ?>
