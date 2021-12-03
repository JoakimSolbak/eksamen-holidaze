<?php
function register_post_types()
{
    register_post_type( 'hotel', [
        'labels'             => [
          'name'               => 'hotels',
          'singular_name'      => 'hotel',
          'menu_name'          => 'Hotels',
          'name_admin_bar'     => 'Hotels',
          'add_new'      => __( 'Legg til' ),
        ],
        'description'        => __( 'List of all hotels.' ),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'hotels-list' ],
        'capability_type'    => 'page',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-building',
        'show_in_rest'       => true,
        'supports'           => [ 'title', 'page-attributes', 'thumbnail', 'editor',  ],
        'show_in_rest'       => true,
        // 'taxonomies'          => [ 'product_cat' ],
      ] );

      register_post_type( 'establishmentEnquiry', [
        'labels'             => [
          'name'               => 'Establishment enquiries',
          'singular_name'      => 'establishmentEnquiriy',
          'menu_name'          => 'Establishment enquiries',
          'name_admin_bar'     => 'Establishment enquiries',
          'add_new'      => __( 'Legg til' ),
        ],
        'description'        => __( 'Establishment enquiries for hotel administrator.' ),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'establishment-enquiries' ],
        'capability_type'    => 'page',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 21,
        'menu_icon'          => 'dashicons-building',
        'show_in_rest'       => true,
        'supports'           => [ 'title', 'page-attributes', 'comments', 'thumbnail', 'editor',  ],
        'show_in_rest'       => true,
        // 'taxonomies'          => [ 'product_cat' ],
      ] );

      register_post_type( 'holidazeEnquiry', [
        'labels'             => [
          'name'               => 'Holidaze enquiries',
          'singular_name'      => 'holidazeEnquiriy',
          'menu_name'          => 'Holidaze enquiries',
          'name_admin_bar'     => 'Holidaze enquiries',
          'add_new'      => __( 'Legg til' ),
        ],
        'description'        => __( 'Holidaze enquiries for Holidaze administrator.' ),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'holidaze-enquiries' ],
        'capability_type'    => 'page',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 21,
        'menu_icon'          => 'dashicons-format-chat',
        'show_in_rest'       => true,
        'supports'           => [ 'title', 'page-attributes', 'comments', 'thumbnail', 'editor',  ],
        'show_in_rest'       => true,
        // 'taxonomies'          => [ 'product_cat' ],
      ] );

}
add_action('init', 'register_post_types');