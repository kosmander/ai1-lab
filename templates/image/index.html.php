<?php

/** @var \App\Model\Image[] $images */
/** @var \App\Service\Router $router */

$title = 'Image Gallery';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Image Gallery</h1>

    <a href="<?= $router->generatePath('image-create') ?>">Add Image to Gallery</a>

    <ul class="index-list">
        <?php foreach ($images as $image): ?>
            <li><img src="<?= $image->getUrl() ?>" alt="<?= $image->getTitle() ?>" width="300" height="300">
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('image-show', ['id' => $image->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('image-edit', ['id' => $image->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
