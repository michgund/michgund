<?php 

    try {
        $db = new PDO('mysql:host=localhost;dbname=wcoding;charset=utf8', 'root', '');
    } catch (Exception $e) {
        die('Error:' . $e->getMessage());
    }