<?php
add_action('acf/init', 'tada_acf_blocks_init');

function tada_acf_blocks_init()
{
    if (function_exists('acf_register_block_type')) {
        acf_register_block_type(array(
            'name' => 'blokk-navn',
            'title' => 'Blokk tittel',
            'post_types' => array('post', 'page'),
            'description' => 'Beskrivelse',
            'render_template' => 'gutenberg/acf-blocks/blokk-navn.php',
            'category' => 'common',
            'icon' => 'images-alt2',
            'keywords' => array('blokk'),
            'supports' => array(
                'align' => false,
            ),
        ));
    }
}
