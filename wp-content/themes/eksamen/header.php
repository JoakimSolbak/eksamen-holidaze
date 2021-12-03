<!DOCTYPE HTML>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<?php
$theme_has_search = get_field('global_theme_has_search', 'option');
?>

<body <?php body_class(); ?>>
	<div id="container">
		<header class="box-shadow">
			<div class="container">
				<nav class="header-nav">
					<a href="<?php echo home_url(); ?>" class="brand-logo"><?php bloginfo('name'); ?></a>
					<ul class="header-nav__ul link">
            <li id="menu-item-27" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-27">
              <button type="button" title="Search for hotels" class="search-modal-toggle"><i class="fas fa-search"></i></button>
            </li>

          <!-- https://mekshq.com/get-current-page-url-wordpress/ -->
          <?php
            global $wp;
            $current_slug = add_query_arg( array(), $wp->request );
          ?>

          <li><a href="<?php the_permalink( get_page_by_path( 'hotels') ); ?>" class="<?= ($current_slug == "hotels") ? "underline" : "" ?>">Hotels</a></li>
          <li><button type="button" title="Contact us" class="contact-modal-toggle">Contact</button></li>

          <?php if(is_user_logged_in()){ ?>
            <li><a href="<?php the_permalink( get_page_by_path( '/dashboard') ); ?>" class="<?= ($current_slug == "dashboard") ? "underline" : "" ?>">My account</a></li>
            <li><a href="/wp-login.php?action=logout">Logout</a></li>
          <?php } else{ ?>
            
            <li><a href="<?php the_permalink( get_page_by_path( '/login') ); ?>" class="<?= ($current_slug == "login") ? "underline" : "" ?>">Login</a></li>
          <?php } ?>

          </ul>
            <button type="button" title="Toggle mobile menu" id="mobile-menu-toggle"> 
              <i class="fas fa-bars"></i>
            </button>

				</nav>
			</div>
      </header>

<!-- https://getbootstrap.com/docs/5.0/components/modal/ -->

<!-- Search Modal -->
<div class="modal fade" id="search-modal" tabindex="-1" aria-labelledby="search-modal-label" aria-hidden="true">
  <div class="container">
    <div class="modal-dialog border-radius box-shadow">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="search-modal-label">Search for hotels</p>
          <button type="button" class="btn-close" aria-label="Close" id="search-close-modal"><i class="fas fa-times-circle"></i></button>
        </div>
        <div class="search-input-wrapper">
          <input type="text" class="search-bar" id="search-bar" placeholder="Search for hotels..."></input>
        </div>
        <div class="modal-body">
          <ul class="search-results-list" id="search-results">
            
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="search-footer-close-modal">Close</button>
          <button type="button" class="btn btn-primary" id="#">View all hotels</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Contact Modal -->
<div class="modal fade" id="contact-modal" tabindex="-1" aria-labelledby="contact-modal-label" aria-hidden="true">
  <div class="container">
    <div class="modal-dialog border-radius box-shadow">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="contact-modal-label">Contact</p>
          <button type="button" class="btn-close" aria-label="Close" id="contact-close-modal"><i class="fas fa-times-circle"></i></button>
        </div>
        <div class="modal-body">
          <h2>Contact us</h2>
          <p>You can contact us here:</p>
          <ul>
            <li><p class="strong">Phone: 99887766</p></li>
            <li><a href="mailto:someone@yoursite.com"><p class="strong">Email: holidaze@gmail.com</p></a></li>
          </ul>
          <p>You can also contact us by <a href="<?php the_permalink( get_page_by_path( '/register') ); ?>" class="text-link">creating an account</a> and filling out a form specifically towards the Holidaze administration or inquire about the hotels themselves. We'll get back to you as soon as possible, typically 1-2 business days.</p>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="contact-footer-close-modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>