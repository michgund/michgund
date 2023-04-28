<?php
$sql = 'SELECT COUNT(*) AS comment_count FROM comments WHERE id_article = :inID';
$response = $db->prepare($sql);
$response->bindParam('inID', $id, PDO::PARAM_INT);
$response->execute();
$commentsPrep = $response->fetch(PDO::FETCH_OBJ);
$commentsCount = $commentsPrep->comment_count;