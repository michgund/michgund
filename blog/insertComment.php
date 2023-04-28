<?php 
session_start();
 include 'dbconnect.php';
$preparedInsertSql = 'INSERT INTO comments (id_article, author, comment) VALUES (:inID, :inAuthor, :inComment)';
$req = $db->prepare($preparedInsertSql);
$req->bindParam('inID', $_SESSION['id'], PDO::PARAM_INT);
$req->bindParam('inAuthor', $_POST['author'], PDO::PARAM_STR);
$req->bindParam('inComment', $_POST['comment'], PDO::PARAM_STR);
$req->execute();

header("location: showArticle.php?id={$_SESSION['id']}#comments");