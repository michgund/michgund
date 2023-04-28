<title><?=$article->title?></title>
<div class="article">
    <img src="https://source.unsplash.com/600x400/?<?=$article->tag?>" alt="">
    <p class="tag"><?= $article->tag; ?></p>
    <h1><?= $article->title; ?></h1>
    <p><?= $article->content; ?></p>
    <div class="author">
        <img src="https://i.pravatar.cc/40?img=<?=rand(0,20)?>" alt="">
        <h3><?= $article->author; ?></h3>
    </div>
</div>