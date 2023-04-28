<?php

    include 'dbconnect.php';

    $sql = "SELECT * FROM article";
    $response = $db->query($sql);

    while ($article = $response->fetch(PDO::FETCH_OBJ)) {
        include 'postView.php';
    }   