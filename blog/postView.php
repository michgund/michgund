<a href="./showArticle.php?id=<?=$article->id?>&page=1">
    <div class="card">
        <div class="top">
            <img src="https://source.unsplash.com/600x400/?<?=$article->tag?>" alt="">
        </div>
        <h1><?= $article->title; ?></h1>
        <div class="bottom">
            <p class="tag"><?= $article->tag; ?></p>
            <div class="author">
                <img src="https://i.pravatar.cc/40?img=<?=rand(0,20)?>" alt="">
                <h3><?= $article->author; ?></h3>
            </div>
            <p class="clamp"><?= $article->content; ?></p>
        </div>
    </div>
</a>