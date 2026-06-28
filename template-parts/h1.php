<?php
$text = $args['text'] ?? '';
$classes = $args['classes'] ?? '';


if ($text) : ?>
    <h1 class="<?php echo esc_attr($classes); ?>"><?php echo esc_html($text); ?></h1>
<?php endif; ?>