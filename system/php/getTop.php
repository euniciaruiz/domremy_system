<?php
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

	$sql = "SELECT * FROM top_tb JOIN product_tb ON product_tb.productId = top_tb.topProduct";

	//$sql = "SELECT * FROM top_tb WHERE topValidity = 1";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    $row = $result->fetch_assoc(); 

	    $data = array(
			"title" => $row['topTitle'],
			"productName" => $row['productName'],
			"productID" => $row['productId']
		);
	    

		echo json_encode($data);
	} else {
	    echo "0 results";
	}
	$conn->close();
?>