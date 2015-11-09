<?php
	include 'ConnectDatabase.php';

	$pageId = $_POST["pageId"];

	$lists = array();

	$query = mysqli_query($con, "SELECT `listProduct` FROM `list_tb` WHERE `listPage` = $pageId AND `listValidity` = 1");

	while($fetch = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
		$l = array();

		$productId =  $fetch['listProduct'];
		$query1 = mysqli_query($con, "SELECT `productId`, `productName`, `productFileName` FROM `product_tb` WHERE `productId` = $productId AND `productValidity` = 1");
		while($fetch1 = mysqli_fetch_array($query1, MYSQLI_ASSOC)) {
			$l['productId'] = $fetch1['productId'];
			$l['productName'] = $fetch1['productName'];
			$l['productFileName'] = $fetch1['productFileName'];

			array_push($lists, $l);
		}
	}
	
	echo json_encode($lists);
?>