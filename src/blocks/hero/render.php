<?php

$heading = $attributes['heading'] ?? '';
$text = $attributes['text'] ?? '';
$background_image_id = $attributes['imageId'] ?? '';
$background_image_url = esc_url($background_image_id ? wp_get_attachment_image_url($background_image_id, 'full') : '');

if (empty($heading) && empty($text) && empty($background_image_id)) {
    return;
}

$background_style = $background_image_url
    ? "--background-image: url('{$background_image_url}');"
    : '';
?>

<section class="jm-section jm-hero">
    <div class="hero-text">
        <?php if ($heading) : ?>
            <h1><?php echo esc_html($heading); ?></h1>
        <?php endif; ?>

        <?php if ($text) : ?>
            <p><?php echo esc_html($text); ?></p>
        <?php endif; ?>
    </div>
    <div class="hero-img" style="<?php echo esc_attr($background_style); ?>">

    </div>
</section>