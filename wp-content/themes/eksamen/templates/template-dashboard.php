<?php /* Template Name: Template User Dashboard */ ?>
<?php
  get_header();
?>

<main>
  <section class="top">
    <div class="top-heading">
      <div class="container">
      <?php 
        if(is_user_logged_in()){
          $user = wp_get_current_user();
          echo '<h1>Dashboard -'. $user->user_nicename .'</h1>'
      ?>
      </div>
    </div>
  </section>
  <?php
    if ( in_array( 'subscriber', (array) $user->roles )) {
    // Stuff to be rendered for normal users
      get_template_part( 'includes/user-dashboard' );
    } elseif ( in_array( 'administrator', (array) $user->roles )){
    // Stuff to be rendered for admins
      get_template_part( 'includes/admin-dashboard' );
    }
  } else{
    header("Location: ".  get_permalink( get_page_by_path( '/login') ) ."");
    die();
  }
  ?>
</main>

<?php get_template_part( 'templates/blocks/newsletter' ); ?>

<?php
  get_footer();
?>

