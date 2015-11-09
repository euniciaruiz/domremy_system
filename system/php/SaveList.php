<?php 
	include 'ConnectDatabase.php';

	date_default_timezone_set('Asia/Tokyo');

	$listPage = $_POST["listPage"];
	$listProduct = $_POST["listProduct"];
	$listRecodeDate = date('Y-m-d H:i:s');

	$insertQuery = "INSERT INTO `list_tb`(`listPage`, `listProduct`, `listRecodeDate`, `listValidity`) VALUES (?, ?, '$listRecodeDate', 1)";
	
	if ($secureInsertQuery = $con->prepare($insertQuery)) {
		$secureInsertQuery->bind_param("ii", $listPage, $listProduct);
		$secureInsertQuery->execute();

		echo json_encode("Success");
	}
	else{
		echo json_encode("Failed to execute insert query.");
	}
?>