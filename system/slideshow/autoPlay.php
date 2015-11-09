<?php
  include_once 'db.php';

  $images = mysqli_query($conn, "SELECT * FROM slide_tb WHERE slideValidity=0");


 ?>

 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
     <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
     <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
     <link rel="stylesheet" type="text/css" href="css/slideshow_style.css">
     <script src="js/slideshow.js"></script>
     <title>Auto play slideshow</title>
     <script type="text/javascript">
     $("#autoplay > div:gt(0)").hide();

     setInterval(function() {
       $('#autoplay > div:first')
       .fadeOut(1000)
       .next()
       .fadeIn(1000)
       .end()
       .appendTo('#autoplay');
     },  1000);
    </script>

   </head>

   <body>
    <div id="autoplay" style="margin:auto;">
      <?php

       while($row = mysqli_fetch_assoc($images)){
          $img = $row['slideFileName'];?>
          <div class="image" style="background: url('<?php echo $img;?>') no-repeat; background-size:cover; height:1067px; width:1067px; margin:0 auto;" ></div>
          <?php
        }
     ?>
   </div>
   </body>
 </html>
