<?php
include_once 'ConnectDatabase.php';

  $allowedTypes = array(IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_JPG, IMAGETYPE_BMP, IMAGETYPE_ICO);
  $detectedType = exif_imagetype($_FILES['file']['tmp_name']);
  $error = !in_array($detectedType, $allowedTypes);
  $timeQuery = mysqli_query($con, "SELECT * FROM time_tb");
  $count = 0;
  $path_info = pathinfo($_FILES['file']['name']);

  if(mysqli_num_rows($timeQuery) == 0){
    $time = $_POST['timeOfSlideShow'];
    if($time < 10){
      $time_padded = sprintf("%02d", $time);
    }else {
      $time_padded = $time;
    }
    if(mysqli_query($con, "INSERT INTO time_tb(timeOfSlideShow, timeValidity) VALUES('$time_padded', 1)")){
      echo "inserted time";
    }else {
      echo "failed to insert time";
    }
  }else {
    // echo "do nothing";
  }


    if($error){
      echo json_encode("error");
    }else{
      if($_FILES['file']['error'] > 0){
        echo json_encode("error! file is not an image!");
      }
      else{
        if(file_exists("../images/".$_FILES['file']['name'])){
          $b64OfExisting = base64_encode(file_get_contents("images/".$_FILES['file']['name']));
          $b64OfUploaded = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
          if($b64OfExisting == $b64OfUploaded){
            echo "error file already exists";
          }else {
              echo "process below";
              $name = $_FILES['file']['name'];
              $actual_name = pathinfo($name, PATHINFO_FILENAME);
              $original_name = $actual_name;
              $extension = pathinfo($name, PATHINFO_EXTENSION);

              while(file_exists('images/'.$actual_name.".".$extension)){
                $actual_name = (string)$original_name.$count;
                $name = $actual_name.".".$extension;
                $count++;
              }
              $target = "../images/".$name;
              $path = $_FILES['file']['name'];
              $move = move_uploaded_file($_FILES['file']['tmp_name'], $target);
              if($move){
                echo json_encode("moved");
                $now = date('Y-m-d H:i:s');
                $sql = "INSERT INTO `slide_tb`(`slideFileName`, `slideRecodeDate`, `slideValidity`) VALUES(?, '$now', 1)";
                if($secure = $con->prepare($sql)){
                  $secure->bind_param("s", $path );
                  $secure->execute();
                  echo json_encode("inserted");
                }else {
                  echo json_encode("error in query");
                }
              }else {
                echo json_encode("error in moving");
              }
            }

          }
          else {
          $target = "../images/".$_FILES['file']['name'];
          $path = $_FILES['file']['name'];
          $move = move_uploaded_file($_FILES['file']['tmp_name'], $target);
          if($move){
            echo json_encode("moved");
            $now = date('Y-m-d H:i:s');
            $sql = "INSERT INTO `slide_tb`(`slideFileName`, `slideRecodeDate`, `slideValidity`) VALUES(?, '$now', 1)";
            if($secure = $con->prepare($sql)){
              $secure->bind_param("s", $path);
              $secure->execute();
              echo json_encode("inserted");
            }else {
              echo json_encode("error in query");
            }
          }else {
            echo json_encode("error in moving");
          }
        }
      }
    }
?>
