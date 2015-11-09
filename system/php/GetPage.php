<?php 
	include 'ConnectDatabase.php';

	$pageId = $_POST["pageId"];

	$page = array();

	// $query = mysqli_query($con, "SELECT `pageButtonName`, pagePepperText, pageType, pageTitle FROM `page_tb` WHERE `pageId` = $pageId");
	$query = mysqli_query($con, "SELECT * FROM `page_tb` WHERE `pageId` = $pageId");

	while($fetch = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
		$p = array();
		$p['pageButtonName'] = $fetch['pageButtonName'];
		$p['pagePepperText'] = $fetch['pagePepperText'];
		$p['pageType'] = $fetch['pageType'];
		$p['pageTitle'] = $fetch['pageTitle'];
		array_push($page, $p);
	}
	
	echo json_encode($page);
?>