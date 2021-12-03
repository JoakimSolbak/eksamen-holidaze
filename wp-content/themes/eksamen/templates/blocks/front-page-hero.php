<section class="index-hero">
  <div class="container">
  <div class="index-hero__items">
    <h1><?php the_title() ?></h1>
    <div class="text-white">
    <?php the_content(); ?>
    </div>

    <?php
    $slug = '/hotels';
    $page_object = get_page_by_path( $slug );
    $permalink = get_permalink( $page_object );
    ?>

    <a href="<?php echo $permalink ?>">
    <button class="btn-primary">View hotels</button>
    </a>
  </div>
  </div>
</section>