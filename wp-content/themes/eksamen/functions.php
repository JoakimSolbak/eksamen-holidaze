<?php
require_once(get_template_directory() . '/includes/theme-config.php');
require_once(get_template_directory() . '/includes/utilities.php');
require_once(get_template_directory() . '/includes/post-types.php');
require_once(get_template_directory() . '/includes/preload.php');
require_once(get_template_directory() . '/includes/styles-and-scripts.php');
require_once(get_template_directory() . '/gutenberg/index.php');

function site_imports(){
  wp_enqueue_style('trailmade-proxima_nova-fonts', '//use.typekit.net/dwz0kyf.css');
  wp_enqueue_style('font-awesome', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
  wp_enqueue_script('google-map', '//maps.googleapis.com/maps/api/js?key=AIzaSyD-9eIKFZIYT2esNlgKBxENHoMeMUmdnOI', NULL, '1.0', true);
}

add_action('wp_enqueue_scripts', 'site_imports');

function site_features(){
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size( 'hotel-image', 500, 384, true ); // 220 pixels wide by 180 pixels tall, soft proportional crop mode
}

add_action('after_setup_theme', 'site_features');


// Google map
function googleMap() {
	acf_update_setting('google_api_key', 'AIzaSyD-9eIKFZIYT2esNlgKBxENHoMeMUmdnOI');
}

add_action('acf/init', 'googleMap');

// Custom API search for hotels post type
// GET http://eksamen.local/wp-json/hotelSearch/v1/search?term=
function hotelPostTypeSearch(){
  register_rest_route('hotelSearch/v1', 'search', array(
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'hotelSearchResults'
  ));
}

function hotelSearchResults($data){
  $hotels = new WP_Query(array(
    'post_type' => 'hotel',
    's' => sanitize_text_field($data['term']),
  ));
  
  $hotelsResults = array();
  
  while($hotels->have_posts()){
    $hotels->the_post();
    array_push($hotelsResults, array(
      'title' => get_the_title(),
      'permalink' => get_the_permalink(),
      'thumbnail' => get_the_post_thumbnail(),
    ));
  }
  return $hotelsResults;
}

add_action('rest_api_init', 'hotelPostTypeSearch');

// Use JWT to login with wordpress
// POST http://eksamen.local/wp-json/auth/v1/auth-user?username=
function authUserWithJwt(){
  register_rest_route('auth/v1', 'auth-user', array(
    'methods' => WP_REST_Server::ALLMETHODS,
    'callback' => 'wpSignIn'
  ));
}

// https://stackoverflow.com/questions/10041583/how-to-log-a-user-in-to-wordpress-using-only-their-user-id
function wpSignIn($data) {
  //if (!is_user_logged_in()) {
    //determine WordPress user account to impersonate
    $user_login = $data['username'];

    var_dump($user_login);

    //get user's ID
    $user = get_userdatabylogin($user_login);
    $user_id = $user->ID;

    //login
    wp_set_current_user($user_id, $user_login);
    wp_set_auth_cookie($user_id);
    do_action('wp_login', $user_login);

  //}
}

add_action('rest_api_init', 'authUserWithJwt');

// https://wordpress.stackexchange.com/questions/38405/why-are-the-comments-disabled-by-default-on-my-custom-post-types
function default_comments_on( $data ) {
  if( $data['post_type'] == 'establishmentEnquiry') {
      $data['comment_status'] = 'open';
  }

  return $data;
}
add_filter( 'wp_insert_post_data', 'default_comments_on' );

// https://wpforms.com/how-to-set-up-wordpress-registration-redirects-complete-guide/
// Redirect default login & logout page to custom login form
function my_registration_page_redirect()
{
    global $pagenow;
    $user = wp_get_current_user();
    if ( ( strtolower($pagenow) == 'wp-login.php') && !in_array( 'administrator', (array) $user->roles )){
        wp_redirect( home_url('/login'));
    } elseif(strtolower( $_GET['loggedout']) == 'true'){
        wp_redirect( home_url());
    }
}
 
add_filter( 'init', 'my_registration_page_redirect' );

// https://stackoverflow.com/questions/4534713/in-wordpress-how-to-redirect-after-a-comment-back-to-the-referring-page
add_filter('comment_post_redirect', 'redirect_after_comment');
function redirect_after_comment($location)
{
  return get_permalink(get_page_by_path('dashboard')) .'?message=Your reply was successfully submitted.';
}


// https://support.advancedcustomfields.com/forums/topic/set-image-as-featured-image/#:~:text=your%20functions.php-,%[…]_set_featured_image(%20%24value
function acf_set_featured_image( $value, $post_id, $field  ){
    
    if($value != ''){
	    //Add the value which is the image ID to the _thumbnail_id meta data for the current post
	    add_post_meta($post_id, '_thumbnail_id', $value);
    }
 
    return $value;
}

// acf/update_value/name={$field_name} - filter for a specific field based on it's name
add_filter('acf/update_value/name=hotel_image', 'acf_set_featured_image', 10, 3);
 
?>