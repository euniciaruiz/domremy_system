<?php
	$id = $_POST['id'];

	$servername = "domremy.xsrv.jp";
	$username = "domremy_system";
    $password = "hqcx66cs";
    $dbname = "domremy_product";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	//$sql = "UPDATE product_tb p, list_tb l SET p.productValidity = 0, l.listValidity = 0 WHERE p.productId = '$id' AND l.listProduct = '$id'";
	$sql = "UPDATE product_tb SET productValidity = 0 WHERE productId='$id'";
	

	if ($conn->query($sql) === TRUE) {
		$sql = "UPDATE list_tb SET listValidity = 0 WHERE listProduct='$id'";
		$conn->query($sql);
	    echo "Successfully deleted";
	} else {
	    echo "Error deleting: " . $conn->error;
	}

	$conn->close();
?>