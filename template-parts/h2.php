<?php
$text = $args['text'] ?? '';
$classes = $args['classes'] ?? '';


if ($text) : ?>
    <h2 class="<?php echo esc_attr($classes); ?>"><?php echo esc_html($text); ?></h2>
<?php endif; ?>