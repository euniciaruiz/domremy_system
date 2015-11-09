<?php
	$id = $_POST['id'];

	$servername = "domremy.xsrv.jp";
	$username = "domremy_system";
    $password = "hqcx66cs";
    $dbname = "domremy_product";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	$pName = $conn->real_escape_string($_POST['name']);
	$pDetail = $conn->real_escape_string($_POST['detail']);
	$pPepperText = $conn->real_escape_string($_POST['pepperText']);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	if (is_uploaded_file($_FILES['file']['tmp_name'])) {
		//$filename = $_POST["file"].$_FILES["file"]["name"];

		if(verifyImage() == "OK"){
        	$sql = "UPDATE product_tb SET productName ='$pName', productDetailText = '$pDetail', productPepperText = '$pPepperText' WHERE productId='$id'";

			if ($conn->query($sql) === TRUE) {
				$temp = explode(".", $_FILES["file"]["name"]);
	            $extension = strtolower(end($temp));

	            $filename = $id .".". $extension;

	            $sql = "UPDATE product_tb SET productFileName ='$filename' WHERE productId='$id'";
            	$conn->query($sql);

				saveImageToServer($filename);
				
		    	echo "Record updated successfully";
			} else {
			    echo "Error updating record: " . $conn->error;
			}
    	}
		
	}
	else{
		$sql = "UPDATE product_tb SET productName ='$pName', productDetailText = '$pDetail', productPepperText = '$pPepperText' WHERE productId='$id'";
		if ($conn->query($sql) === TRUE) {
	    	echo "Record updated successfully";
		} else {
		    echo "Error updating record: " . $conn->error;
		}
	}
	

	$conn->close();

	// function saveImageToServer(){
 //        $filename = $_POST["file"].$_FILES["file"]["name"];
 //        move_uploaded_file($_FILES["file"]["tmp_name"], "../images/" . $filename); 
 //    }
    function saveImageToServer($filename){
        move_uploaded_file($_FILES["file"]["tmp_name"], "../images/" . $filename); 
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
?>