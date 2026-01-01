<?php
    /** @var $image ?\App\Model\Image */
?>

<div class="form-group">
    <label for="Title">Title</label>
    <input type="text" id="title" name="image[title]" value="<?= $image ? $image->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="url">Url address</label>
    <textarea id="url" name="image[url]"><?= $image? $image->getUrl() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
