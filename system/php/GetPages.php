<?php
	include 'ConnectDatabase.php';

	$pages = array();

	$query = mysqli_query($con, "SELECT `pageId`, `pageButtonName` FROM `page_tb` WHERE `pageValidity` = 1");

	while($fetch = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
		$p = array();
		$p['pageId'] = $fetch['pageId'];
		$p['pageButtonName'] = $fetch['pageButtonName'];
		array_push($pages, $p);
	}
	
	echo json_encode($pages);
?>