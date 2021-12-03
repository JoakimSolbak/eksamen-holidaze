<?php acf_form_head(); ?>

<?php wp_reset_postdata(); ?>

<?php if($_GET['message']){
  echo '<div class="container"><div class="comment-feedback-container">'. $_GET['message'] .'</div></div>';
} ?>

<section class="dashboard">
  <div class="container">
    <nav class="dashboard-links" id="dashboard-links">

      <div class="profile-links">
        <button type="submit" id="enquiries-btn" title="Lists of all enquiries" class="">Enquiries</button>
        <button type="submit" id="new-establishment-btn" title="Create a new establishment listing" class="active-dashboard-tablink">New establishment</button>
      </div>

      <div class="contact-links visually-hidden" id="contact-links">
        <button type="submit" id="establishment-enq-btn" title="Establishment enquiries" class="">Establishment enquiries</button>
        <button type="submit" id="holidaze-enq-btn" title="Holidaze enquiries" class="">Holidaze enquiries</button>
      </div>

    </nav>
  </div>

  <div id="dashboard-content-container">
    <div class="container">
      <div id="dashboard-content" class="dashboard-content border-radius box-shadow">

        <div id="new-establishment-interface" class="">
          <h2>Register new establishment</h2>

          <div id="content">
            
            <?php
            $spinner = get_bloginfo('template_directory') .'\assets\svg\loading-search-results.svg';
            acf_form(array(
              'post_id'		=> 'new_post',
              'post_title'	=> true,
              'post_content'	=> true,
              'new_post'		=> array(
                'post_type'		=> 'hotel',
                'post_status'	=> 'publish'
              ),
              'html_submit_button'  => '<input type="submit" class="acf-button button button-large" value="Submit">',
              'html_submit_spinner' => '<img src="'. $spinner .'" alt="Submitting form..." class="acf-spinner" width="50px" alt="Loading search results">',
              'return' => '%post_url%',
            ));
            
            ?>
            <?php wp_reset_postdata(); ?>
            
          </div>
        </div>

        <div id="establishment-enquiries-interface" class="visually-hidden">
        <h2>Establishment enquiries</h2>
        <div id="content">
          
            <?php 
            $args = array(
              "post_type" => "establishmentEnquiry",
              'posts_per_page' => -1,
              'orderby' => 'date',
              'order' => 'ASC',
            );
            // The Query
            $the_query = new WP_Query( $args ); ?>

            <?php if ( $the_query->have_posts() ) : ?>
              <?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
                <article class="enquiry">
                  <h3><?php echo get_the_title(); ?></h3>
                  <div class="enquiry-body">
                    <div class="enquiry-author"><?php echo get_the_author(); ?></div>
                    <div class="enquiry-date text-black-alt"><time datetime="<?php echo get_the_date(); ?>"><?php echo get_the_date(); ?></time></div>
                    <p class="enquiry-content"><?php echo get_the_content(); ?></p>
                    <?php
                    $comments = get_comments( array( 'post_id' => get_the_ID(), 'orderby' => 'date', 'order' => 'ASC', ) );
    
                    foreach ( $comments as $comment ) : ?>
                      <?php if(is_user_logged_in()){
                          $user = wp_get_current_user();
                          $userName = $user->user_nicename;
                        }?>
                      <article class="enquiry-comment border-radius box-shadow <?php if($comment->comment_author == $userName){ echo "enquiry-comment-logged-in-user"; } ?>">
                        <div class="comment-author"><?php echo $comment->comment_author; if($comment->comment_author == $userName){ echo " (you)"; } ?>  </div>
                        <div class="comment-date text-black-alt"><time datetime="<?php echo $comment->comment_date; ?>"><?php echo $comment->comment_date; ?></time></div>
                        <p class="enquiry-comment-content"><?php echo $comment->comment_content; ?></p>
                      </article>
                    <?php
                    endforeach;
                    ?>
                    <?php comment_form(); ?>
                  </div>
                  <button class="enquiry-toggle" title="Open the enquiry ticket named <?php echo get_the_title(); ?>  .">
                    <i class="fas fa-chevron-down"></i>
                    <i class="fas fa-times"></i>
                  </button>
                </article>
              <?php endwhile; ?>
              <?php else : ?>
                    <p><?php _e( 'There are currently no open Holidaze enquiry tickets.' ); ?></p>
            <?php endif; ?>

            <?php wp_reset_postdata(); ?>

          </div>
        </div>
        
        <div id="holidaze-enquiries-interface" class="visually-hidden">
        <h2>Holidaze enquiries</h2>
        <div id="content">

          <?php 
            $args = array(
              "post_type" => "holidazeEnquiry",
              'posts_per_page' => -1,
              'orderby' => 'date',
              'order' => 'ASC',
            );
            // The Query
            $the_query = new WP_Query( $args ); ?>

            <?php if ( $the_query->have_posts() ) : ?>
              <?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
                <article class="enquiry">
                  <h3><?php echo get_the_title(); ?></h3>
                  <div class="enquiry-body">
                    <div class="enquiry-author"><?php echo get_the_author(); ?></div>
                    <div class="enquiry-date text-black-alt"><time datetime="<?php echo get_the_date(); ?>"><?php echo get_the_date(); ?></time></div>
                    <p class="enquiry-content"><?php echo get_the_content(); ?></p>
                    <?php
                    $comments = get_comments( array( 'post_id' => get_the_ID(), 'orderby' => 'date', 'order' => 'ASC', ) );
    
                    foreach ( $comments as $comment ) : ?>
                      <?php if(is_user_logged_in()){
                          $user = wp_get_current_user();
                          $userName = $user->user_nicename;
                        }?>
                      <article class="enquiry-comment border-radius box-shadow <?php if($comment->comment_author == $userName){ echo "enquiry-comment-logged-in-user"; } ?>">
                        <div class="comment-author"><?php echo $comment->comment_author; if($comment->comment_author == $userName){ echo " (you)"; } ?>  </div>
                        <div class="comment-date text-black-alt"><time datetime="<?php echo $comment->comment_date; ?>"><?php echo $comment->comment_date; ?></time></div>
                        <p class="enquiry-comment-content"><?php echo $comment->comment_content; ?></p>
                      </article>
                    <?php
                    endforeach;
                    ?>
                    <?php comment_form(); ?>
                  </div>
                  <button class="enquiry-toggle" title="Open the enquiry ticket named <?php echo get_the_title(); ?>  .">
                    <i class="fas fa-chevron-down"></i>
                    <i class="fas fa-times"></i>
                  </button>
                </article>
              <?php endwhile; ?>
              <?php else : ?>
                <p><?php _e( 'There are currently no open Holidaze enquiry tickets.' ); ?></p>
            <?php endif; ?>
        </div>

      </div>
    </div>
  </div>

</section>

