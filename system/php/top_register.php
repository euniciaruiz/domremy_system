<?php
    
    $Title = $_POST["title"];
    $id = $_POST["productID"];

    updateTop($Title,$id);

    function updateTop($Title, $id){

        date_default_timezone_set("Asia/Tokyo"); //set timezone to Tokyo
        $date =  date("Y-m-d H:i:s");        

        $servername = "domremy.xsrv.jp";
        $username = "domremy_system";
        $password = "hqcx66cs";
        $dbname = "domremy_product";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $Title = $conn->real_escape_string($Title);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        $sql = "UPDATE top_tb SET topTitle ='$Title', topProduct = '$id', topRecodeDate = '$date', topValidity = 1 WHERE topId = 1";

        if ($conn->query($sql) === TRUE) {
            echo "トップページの登録が完了しました";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
        
    }
?>