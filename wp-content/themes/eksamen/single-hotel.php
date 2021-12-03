<?php
  get_header();
?>
	<section class="hotels-single-heading">
    <div class="container">
      <h1><?php echo get_the_title(); ?></h1>
    </div>
  </section>

<main>
  <section class="hotels-single-content">
    <div class="container">
      <div class="grid-row hotels-single-container">

        <div class="hotels-single-left box-shadow border-radius">
          <div class="hotel-item-img">
            <?php the_post_thumbnail("hotel-image"); ?>
          </div>
          <?php 
          
          echo '<ul class="hotels-single-list">';?>
            <li class="hotel-list__item">

              <div class="hotel-item-info">
                <ul class="hotel-item-info-list">
                  <li>
                    <strong>Accomodation: </strong>
                    <?php the_field('accomodations_list'); ?>
                  </li>
                  <li>
                    <strong>Address: </strong>
                    <?php the_field('address'); ?>
                  </li>
                  <li>
                    <strong>Postal code: </strong>
                    <?php the_field('postal_code'); ?>
                  </li>
                  <li>
                    <strong>Price: </strong>
                    <?php the_field('price'); ?>
                  </li>
                  <li>
                    <?php 
                    if(get_field('reviews')){
                    ?><strong>Reviews: </strong>
                    <?php the_field('reviews'); ?>
                    <?php }else{ 
                      echo 'No reviews';
                    } ?>
                  </li>
                  <li>
                    <?php
                    if(get_field('features')){
                    ?><strong>Features: </strong>
                    <?php the_field('features'); ?>
                    <?php }else{ 
                      echo '';
                    } ?>

                  </li>
                  <li>
                  <a href="<?php the_permalink(get_page_by_path( '/dashboard')) ?>">
                      <button class="btn-primary">Contact establishment</button>
                    </a>
                  </li>
                  <li>
                  <a href="<?php the_permalink() ?>">
                      <button class="btn-secondary">Visit website</button>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <?php 
          echo '</ul>';

          ?>
            
        </div>

        <div class="hotels-single-right">
          <div class="acf-map border-radius box-shadow">
            <?php $googleMapLocation = get_field('map_location'); ?>
            <div class="marker" data-lat="<?php echo $googleMapLocation['lat'] ?>" data-lng="<?php echo $googleMapLocation['lng'] ?>">
              <small class="lead"><?php the_title() ?></small>
              <br>
              <small><?php the_field('accomodations_list'); ?></small>
              <br>
              <strong><?php echo $googleMapLocation['address']?></strong>
            </div>
          </div>

          <?php the_content(); ?>
        </div>

      </div>
    </div>
  </section>
</main>

<?php get_template_part( 'templates/blocks/newsletter' ); ?>
<?php
  get_footer();
?>