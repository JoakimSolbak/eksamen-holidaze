<?php
add_action('wp_enqueue_scripts', function () {
	$versionCss = filemtime(get_template_directory() . '/style.css');
	$versionJs = filemtime(get_template_directory() . '/js/scripts.min.js');

	// Styles
	wp_enqueue_style('style-css', get_bloginfo('template_directory') . '/style.css', array(), $versionCss);

	// Scripts
	// wp_deregister_script('jquery');
	//wp_enqueue_script("jquery");
	wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), null, true);

	wp_register_script('scripts-js', get_bloginfo('template_directory') . '/js/scripts.js', array(), $versionJs, true);
	wp_enqueue_script('scripts-js');

  // Add global JavaScript variables to Main JS
	wp_localize_script( 'scripts-js', 'MAIN', [
    'nonce' => wp_create_nonce('wp_rest'),
    'themedir' => get_template_directory_uri(),
    ] );
});

// Editor styles
add_theme_support('editor-styles');
add_editor_style('editor-style.css');

