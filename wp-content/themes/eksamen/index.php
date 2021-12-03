<?php
  get_header();
?>

<main>
  <section class="top">
    <div class="top-heading">
      <div class="container">
        <h1><?php the_title() ?></h1>
        <p><?php the_content() ?></p>
      </div>
    </div>
  </section>
</main>

<?php get_template_part( 'templates/blocks/newsletter' ); ?>
<?php get_footer(); ?>
