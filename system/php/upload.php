<?php

    if(verifyImage() == "OK"){
        saveDataToDatabase();
    }

    function verifyImage(){

        $allowedExts = array("gif", "jpeg", "jpg", "png");
        $temp = explode(".", $_FILES["file"]["name"]);
        $extension = strtolower(end($temp));

        if ((($_FILES["file"]["type"] == "image/gif") || ($_FILES["file"]["type"] == "image/jpeg")
                || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/pjpeg")
                || ($_FILES["file"]["type"] == "image/x-png") || ($_FILES["file"]["type"] == "image/png"))
                && ($_FILES["file"]["size"] < 1000000) && in_array($extension, $allowedExts)) {

            if ($_FILES["file"]["error"] > 0) {
                echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
            }
            else {
                return "OK";
            }
        } else {
            return "Bad";
        }
    }

    function saveImageToServer($filename){
        //$filename = $_POST["file"].$_FILES["file"]["name"];
        move_uploaded_file($_FILES["file"]["tmp_name"], "../images/" . $filename);
    }

    function saveDataToDatabase(){

        date_default_timezone_set("Asia/Tokyo"); //set timezone to Tokyo
        $date =  date("Y-m-d H:i:s");

        $servername = "domremy.xsrv.jp";
        $username = "domremy_system";
        $password = "hqcx66cs";
        $dbname = "domremy_product";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        $ProductName = $conn->real_escape_string($_POST["product"]);
        $PepperText = $conn->real_escape_string($_POST["pepperText"]);
        $Text = $conn->real_escape_string($_POST["detail"]);


        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO product_tb (productName, productDetailText, productPepperText, productRecodeDate, productValidity)
                VALUES ('$ProductName', '$Text','$PepperText','$date','1')";

        if ($conn->query($sql) === TRUE) {

            $temp = explode(".", $_FILES["file"]["name"]);
            $extension = strtolower(end($temp));

            $id = $conn->insert_id;
            $filename = $id .".". $extension;

            $sql = "UPDATE product_tb SET productFileName ='$filename' WHERE productId='$id'";
            $conn->query($sql);

            saveImageToServer($filename);
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();

    }
?>
