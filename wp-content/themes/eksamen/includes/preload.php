<?php function preload_assets()
{
    echo '<link rel="preload stylesheet" href="/wp-content/themes/starter-kit/critical.css" as="style" crossorigin="anonymous">';
}


add_action('wp_head', 'preload_assets', 0);
