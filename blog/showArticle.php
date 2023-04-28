
<link rel="stylesheet" href="style.css">

<?php

include 'dbconnect.php';
session_start();
$id = $_SESSION['id'] = $_GET['id'];
// check if article is valid else send them back to index
if (($id > 3 OR $id < 1)) {
    header('location: index.php');
}

// load the article
$sql = 'SELECT * FROM article WHERE id = :inID';
$response = $db->prepare($sql);
$response->bindParam('inID', $id, PDO::PARAM_INT);
$response->execute();

while ($article = $response->fetch(PDO::FETCH_OBJ)) {
    include 'articleView.php';
}
// initialize offset for displaying comments
$offset = 0;
// how many comments showing (also used to offset)
$commentsShown = 5;
if (isset($_GET['page'])) {
    $page = $_SESSION['page'] = intval($_GET['page']);
    $offset = (intval($page)-1)*$commentsShown;
}

include 'commentCounter.php';

// load the comments
$sql = 'SELECT * FROM comments WHERE id_article = :inID ORDER BY id desc LIMIT :inOff,:inLimit';
$response = $db->prepare($sql);
$response->bindParam('inID', $id, PDO::PARAM_INT);
$response->bindParam('inOff', $offset, PDO::PARAM_INT);
$response->bindParam('inLimit', $commentsShown, PDO::PARAM_INT); 
$response->execute();
?>
<div id="comments">
    <form action="insertComment.php" method="POST">
        <!-- <input type="hidden" name="id" value="$id"> -->
        <input type="text" name="author" id="author" placeholder="username">
        <input type="text" name="comment" id="comment" placeholder="comment">
        <input type="submit" value="SEND" id="send">
    </form>
    <!-- Display the comments -->
    <?php
        while ($comment = $response->fetch(PDO::FETCH_OBJ)) {
            include 'commentView.php';
        }
    ?>
    <!-- Comment pagination system -->
    <div class="paga">
        <span>Page:</span>
        <?php
        // echo $commentsShown;
        // echo $commentsCount;    
        $page = 1;
        for ($i = 0; $i < $commentsCount; $i+=$commentsShown) {
            // echo $page;
            echo "<a href='./showArticle.php?id=$id&page=$page#comments'>$page</a>";
            $page++;
        }
        ?>
    </div>
</div>

<a id="home" href="./index.php"><- HOME</a>