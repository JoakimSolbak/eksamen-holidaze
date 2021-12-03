<?php function tada_color_palette()
{
    add_theme_support('disable-custom-colors');
    add_theme_support('editor-color-palette', array(
        array(
            'name' => __('Matt blå', 'tada'),
            'slug' => 'color-muted-blue',
            'color' => '#dff7f5',
        ),
        array(
            'name' => __('Lyseblå', 'tada'),
            'slug' => 'color-light-blue',
            'color' => '#b2edec',
        ),
    ));
}
