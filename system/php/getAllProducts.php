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

	$sql = "SELECT * FROM product_tb WHERE productValidity = 1";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	    	$product = array(
			    "id" => $row['productId'],
			    "name" => $row['productName'],
			    "fileName" => $row['productFileName'],
			    "detailText" => $row['productDetailText'],
			    "pepperText" => $row['productPepperText']
			  );
	    	$products[] = $product;
    	}
	    

		echo json_encode($products);
	} else {
	    echo "0 results";
	}
	$conn->close();
?>