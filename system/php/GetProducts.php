<?php 
	include 'ConnectDatabase.php';

	$products = array();

	$query = mysqli_query($con, "SELECT `productId`, `productName`, `productFileName` FROM product_tb WHERE productValidity = 1");

	while($fetch = mysqli_fetch_array($query,MYSQLI_ASSOC)) {
		$p = array();
		$p['productId'] = $fetch['productId'];
		$p['productName'] = $fetch['productName'];
		$p['productFileName'] = $fetch['productFileName'];
		array_push($products,$p);
	}
	echo json_encode($products);
?>