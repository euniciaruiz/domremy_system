<?php
include_once 'ConnectDatabase.php';

$images = mysqli_query($con, "SELECT * FROM slide_tb WHERE slideValidity=1");
$time = mysqli_query($con, "SELECT * FROM time_tb WHERE timeValidity=1");
$row = mysqli_fetch_row($time);
$timeRows = mysqli_num_rows($time);
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script type="text/javascript" src="../script/bootstrap-filestyle.min.js"> </script>
    <script src="../script/jquery-1.11.3.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="../css/page_style.css"/>
    <link rel="stylesheet" type="text/css" href="../css/slideshow_style.css">
    <link rel="stylesheet" href="../font-awesome-4.4.0/css/font-awesome.css" type="text/css">
    <script src="../script/slideshow.js"></script>
    <title>Slideshow</title>
  </head>
  <body>

    <div id="wholeContents">
        <div class="alert alert-success alert-dismissible" role="alert" id="successAddingImage" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>成功！</strong> スライドショーに画像を追加しました!
        </div>

        <div class="alert alert-danger alert-dismissible" role="alert" id="failedAddingImage" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>ごめんなさい！</strong> スライドショーに画像を追加できませんでした!
        </div>

        <div class="alert alert-success alert-dismissible" role="alert" id="successDeletingImage" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>成功！</strong> スライドショーから削除された画像!
        </div>

        <div class="alert alert-danger alert-dismissible" role="alert" id="failedDeletingImage" style="display:none;">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>ごめんなさい！</strong> スライドショーからイメージを削除できませんでした！
        </div>

        <br>
        <div id="addImageToSlideShow">
          <form method="post" enctype="multipart/form-data" id="slideShowForm">
            <table class="slideshowformtable" class="table">
              <tr>
                <td>
                  <label>Select Image</label>
                  <div style="margin-top: 5px;">
                    <input type="file" id="file" name="file" class="filestyle" data-badge="false" data-input="false" data-icon="false" data-buttonText="Choose Image" required='true'>
                  </div>
                </td>
                <td><div id="imagePreview"></div></td>
              </tr>
            <tr>
              <td></td>
              <td><input type="submit" id="submitImage" class="btn btn-success" value="Upload"></td>
            </tr>
            </table>
            <br><br>
            <table>

                <tr>
                  <?php if ($timeRows > 0) {
                    echo '<td>
                      <label>Time of Slideshow: </label>
                      <input type="number" name="timeOfSlideShow" id="timeOfSlideShow" readonly="true" value="'.$row[1].'" min="0" max="59" onkeypress="pad()" onclick="pad()"/>
                    </td>';
                    echo '<td>&nbsp;<button type="button" id="editTimeOfSlideShow" name="editTimeOfSlideShow" class="btn btn-success"><i class=\'fa fa-pencil\'></i></button></td>';
                      echo '<td>&nbsp;<button type="button" id="saveTimeOfSlideShow" name="saveTimeOfSlideShow" style="display:none;" class="btn btn-success"><i class=\'fa fa-floppy-o\'></i></button></td>';
                  } else {
                    echo '<td>
                      <label>スライドショーの時間: </label>
                      <input type="number" name="timeOfSlideShow" id="timeOfSlideShow" onkeypress="pad()" min="0" max="59" onclick="pad()"/>
                    </td>';
                  }
                  ?>

                </tr>

            </table>
          </form>

        </div>
        <br><br>
        <div id="savedImages" class="container">
          <table id="slidesTable">
              <?php
              if(mysqli_num_rows($images) > 0){
                while($row = mysqli_fetch_assoc($images)){
                  $img = "../images/".$row['slideFileName'];
                  $id = $row['slideId'];
               ?>
                <tr class="border-btm">
                  <td class="imagePadding"><div style="background: url('<?php echo $img;?>') no-repeat; background-size:cover; height:50px; width:50px;" ></div></td>
                  <td id="deleteIcon"><div class="deleteImageFromSlideShow wiggle-me" id="deleteImage-<?php echo $id ;?>"><i  id='trash' class="fa fa-trash fa-lg"></i></div></td>
                </tr>
              <?php
              }
            }
             ?>
          </table>
        </div>
      </div>
      <div id="parent">
        <div id="circularG" style="display:none;">
        	<div id="circularG_1" class="circularG"></div>
        	<div id="circularG_2" class="circularG"></div>
        	<div id="circularG_3" class="circularG"></div>
        	<div id="circularG_4" class="circularG"></div>
        	<div id="circularG_5" class="circularG"></div>
        	<div id="circularG_6" class="circularG"></div>
        	<div id="circularG_7" class="circularG"></div>
        	<div id="circularG_8" class="circularG"></div>
        </div>
      </div>
  </body>
</html>
