<?php
	include 'ConnectDatabase.php';

	date_default_timezone_set('Asia/Tokyo');

	$pageButtonName = $_POST["pageButtonName"];
	$pagePepperText = $_POST["pagePepperText"];
	$pageType = $_POST["pageType"];
	$pageTitle = $_POST["pageTitle"];
	$pageRecodeDate = date('Y-m-d H:i:s');
	$pageId = $_POST["pageId"];

	$updateQuery = "UPDATE `page_tb` SET `pageButtonName` = ?,`pagePepperText` = ?,`pageType` = ?,`pageTitle` = ?,`pageRecodeDate` = '$pageRecodeDate',`pageValidity` = 1 WHERE `pageId` = ?";

	if ($secureUpdateQuery = $con->prepare($updateQuery)) {
		$secureUpdateQuery->bind_param("ssssi", $pageButtonName, $pagePepperText, $pageType, $pageTitle, $pageId);
		$secureUpdateQuery->execute();

		$deletQquery = "DELETE FROM `list_tb` WHERE listPage = ?";

		if ($secureDeleteQuery = $con->prepare($deletQquery)) {
			$secureDeleteQuery->bind_param("i", $pageId);
			$secureDeleteQuery->execute();

			echo json_encode("Success");
		}
		else{
			echo json_encode("Failed to execute delete query.");
		}
	}
	else{
		echo json_encode("Failed");
	}
?>