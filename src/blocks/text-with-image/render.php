<?php

//todo add image controls + allow for reading order to be resolved + pallete controls

$heading = $attributes['heading'] ?? '';
$label   = $attributes['label'] ?? '';
$text    = $attributes['text'] ?? '';

$link       = $attributes['link'] ?? [];
$link_text  = $attributes['linkText'] ?? '';

$button_args = [
    'text'    => $link_text,
    'url'     => $link['url'] ?? '',
    'classes' => '',
];

?>

<section class="jm-section jm-text-with-image">
    <div class="column">

        <?php
        get_template_part(
            slug: 'template-parts/paragraph',
            name: null,
            args: [
                'text'    => $label,
                'classes' => 'label',
            ]
        );
        ?>

        <div class="text-content">

            <?php
            get_template_part(
                slug: 'template-parts/h2',
                name: null,
                args: [
                    'text'    => $heading,
                    'classes' => 'heading',
                ]
            );
            ?>

            <?php
            get_template_part(
                slug: 'template-parts/paragraph',
                name: null,
                args: [
                    'text'    => $text,
                    'classes' => 'text',
                ]
            );
            ?>

        </div>

        <?php get_template_part('template-parts/button', 'link', $button_args); ?>

    </div>

    <div class="column">
        <img
            src="https://placehold.co/600x400"
            alt="Image description" />
    </div>
</section>