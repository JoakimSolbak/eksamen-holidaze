<?php get_header(); ?>

<?php get_template_part( 'templates/blocks/front-page-hero'); ?>

<?php get_template_part( 'templates/blocks/front-page-features', null, array(
  'title' => 'Features',
  'items' => array(
    array(
      'title' => 'Book hotels',
      'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis est. Aenean mollis tellus efficitur 
      nunc egestas blandit. In eget vestibulum risus. Cras nulla felis, fermentum eu rutrum vel, porta sed est. 
      Proin fermentum tincidunt dui, sed viverra tellus mollis quis. Morbi dapibus ante sit amet neque lacinia scelerisque.',
      'icon' => 'calendar-alt',
      'slug' => '/hotels',
    ),
    array(
      'title' => 'Get in touch',
      'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis est. Aenean mollis tellus efficitur 
      nunc egestas blandit. In eget vestibulum risus. Cras nulla felis, fermentum eu rutrum vel, porta sed est. 
      Proin fermentum tincidunt dui, sed viverra tellus mollis quis. Morbi dapibus ante sit amet neque lacinia scelerisque.',
      'icon' => 'comments',
      'slug' => '/contact',
    ),
    array(
      'title' => 'Register hotels',
      'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis est. Aenean mollis tellus efficitur 
      nunc egestas blandit. In eget vestibulum risus. Cras nulla felis, fermentum eu rutrum vel, porta sed est. 
      Proin fermentum tincidunt dui, sed viverra tellus mollis quis. Morbi dapibus ante sit amet neque lacinia scelerisque.',
      'icon' => 'building',
      'slug' => '/',
    )
  )
) ); ?>

<?php get_template_part( 'templates/blocks/newsletter' ); ?>
<?php get_footer(); ?>