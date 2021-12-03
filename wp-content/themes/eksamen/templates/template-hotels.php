<?php /* Template Name: Hotels page Template */ ?>
<?php
  get_header();
?>

<section class="hotels-hero">
  <div class="container">
    <div class="hotels-hero__heading">
      <h1><?php the_title() ?></h1>
      <p><?php the_content() ?></p>
    </div>
    <div class="hotels-hero__map">
      <div class="acf-map border-radius box-shadow">
        <?php
          $args = array(
            "post_type" => "hotel",
          );
          // The Query
          $the_query = new WP_Query( $args );
          
          // The Loop
          while ( $the_query->have_posts() ) {
            $the_query->the_post();
            $googleMapLocation = get_field('map_location');
        ?>  
          <div class="marker" data-lat="<?php echo $googleMapLocation['lat'] ?>" data-lng="<?php echo $googleMapLocation['lng'] ?>">
            <small class="lead"><?php the_title() ?></small>
            <br>
            <small><?php the_field('accomodations_list'); ?></small>
            <br>
            <strong><?php echo $googleMapLocation['address']?></strong>
            <br>
            <strong><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">View details</a></strong>
            
          </div>
          <?php }; 
          /* Restore original Post Data */
            wp_reset_postdata();
          ?>
      </div>
    </div>
  </div>
  
</section>

<main>
	<section class="hotels-list">
    <div class="container">
      <div class="hotels-list-container">
        <aside class="hotels-list__aside box-shadow border-radius">
          <div class="hotel-list__aside-heading">
            Filters
          </div>
          <hr>
          <div class="hotel-list__aside-heading">
            Accomodation
          </div>
          <?php
            echo facetwp_display( 'facet', 'accomodation' )
          ?>

          <hr>

          <div class="hotel-list__aside-heading">
            Features
          </div>
          <?php
            echo facetwp_display( 'facet', 'features' )
          ?>

          <hr>

          <div class="hotel-list__aside-heading">
            Price
          </div>
          <?php echo facetwp_display( 'facet', 'price' ) ?>

        </aside>
        	
        <div>
          <?php 
          $args = array(
            "post_type" => "hotel",
            "facetwp" => true,
            'posts_per_page' => 6,
          );
          // The Query
          $the_query = new WP_Query( $args );
          
          // The Loop
          if ( $the_query->have_posts() ) {

              echo facetwp_display( 'sort' );
              echo '<ul class="hotels-list__items grid-row">';
              while ( $the_query->have_posts() ) {
                $the_query->the_post(); ?>
                <li class="hotel-list__item box-shadow border-radius">
                  <div class="hotel-item-img">
                    <?php the_post_thumbnail("hotel-image"); ?>
                  </div>
                  <div class="hotel-item-info">
                    <h2><?php the_title() ?></h2>
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
                    </ul>
                    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                      <button class="btn-primary">View details</button>
                    </a>
                  </div>
                </li>
              <?php }
              echo facetwp_display( 'pager' );
              echo '</ul>';
          } else {
              // no posts found
          }
          /* Restore original Post Data */
          wp_reset_postdata();
          ?>
            
        </div>
      </div>
        
    </div>
	</section>
</main>

<?php get_template_part( 'templates/blocks/newsletter' ); ?>

<?php
  get_footer();
?>