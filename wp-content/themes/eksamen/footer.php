<footer>
  <div class="container">
    <nav class="footer-nav">
      <a href="<?php echo home_url(); ?>" class="brand-logo"><?php bloginfo('name'); ?></a>

      <hr>

<?php wp_nav_menu(array(
        'menu_class' => 'link footer-nav__ul link',
        'container_class' => 'footer__nav-container',
        'theme_location' => '',
      )); ?>
      
      <ul class="footer-nav__ul link">
        <li>
          <a href=""><i class="fab fa-twitter-square"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-facebook-square"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-instagram-square"></i></a>
        </li>
      </ul>

    </nav>

    <hr>

    <small>Copyright © 2021 Holidaze - All rights reserved</small>
  </div>
</footer>

<?php wp_footer(); ?>
</div>
</body>

</html>