<?php

/** @var \App\Model\Image $image */
/** @var \App\Service\Router $router */

$title = "{$image->getTitle()} ({$image->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $image->getTitle() ?></h1>
    <article>
        <?= $image->getUrl();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('image-index') ?>">Back to gallery</a></li>
        <li><a href="<?= $router->generatePath('image-edit', ['id'=> $image->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
