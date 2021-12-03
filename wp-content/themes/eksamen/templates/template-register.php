<?php /* Template Name: Register Standard User Template */ ?>
<?php
  get_header();
?>

<main>
  <section class="gravity-form-section">
    <div class="container">
      <div class="gravity-heading">
        <h1><?php the_title() ?></h1>
      </div>
      <div class="gravity-form">
        <?php echo gravity_form( 1, false, false, false, false, true, false, false ); ?>
      </div>
      <hr>
      <div class="gform-below">
        <small>
          By registering an account you agree to our <a href="<?= get_permalink( get_page_by_path( '/privacy-policy') ); ?>" class="gform-link">Terms of Service</a> and <a href="<?= get_permalink( get_page_by_path( '/privacy-policy') ); ?>" class="gform-link">Privacy Policy</a>
        </small>
        <small>Already registered? <a href="<?= get_permalink( get_page_by_path( '/login') ); ?>" class="gform-link">Log in</a></small>
      </div>
    </div>
  </section>
</main>


<?php get_template_part( 'templates/blocks/newsletter' ); ?>

<?php
  get_footer();
?>