<?php
$args = $args ?? [];

$text    = $args['text'] ?? '';
$classes = $args['classes'] ?? '';
$level     = $args['level'] ?? '2';

$allowed_levels = ['1', '2', '3', '4', '5', '6'];

if (!in_array($level, $allowed_levels, true)) {
    $level = '2';
}

if (!$text) {
    return;
}

$tag = "h$level";

$safe_classes = esc_attr($classes);
$safe_text = esc_html($text);

echo "<{$tag} class=\"{$safe_classes}\">{$safe_text}</{$tag}>";
