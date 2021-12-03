<?php 

$title = $args['title'];
$items = $args['items'];

?>

<section class="index-features">
  <div class="container">
    <h2><?php echo $title; ?></h2>
    <div class="grid-row cols-3">

      <?php foreach($items as $item) : ?>
        <div class="col">
        <i class="fas fa-<?php echo $item['icon']; ?>"></i>
        <h3><?php echo $item['title']; ?></h3>
        <p><?php echo $item['content']; ?></p>
        <a href="<?php echo get_permalink( get_page_by_path( $item['slug']) ); ?>" class="link">Learn more</a>
      </div>
      <?php endforeach; ?>

    </div>
  </div>
</section>


<!-- >

<section class="index-features">
  <div class="container">
    <h2>Features</h2>
    <div class="grid-row cols-3">

      <div class="col">
        <i class="fas fa-calendar-alt"></i>
        <h3>Book hotels</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis est. Aenean mollis tellus efficitur 
          nunc egestas blandit. In eget vestibulum risus. Cras nulla felis, fermentum eu rutrum vel, porta sed est. 
          Proin fermentum tincidunt dui, sed viverra tellus mollis quis. Morbi dapibus ante sit amet neque lacinia scelerisque.
        </p>
        <?php 
          $slug = '/hotels';
          $page_object = get_page_by_path( $slug );
          $permalink = get_permalink( $page_object );
         ?>
        <a href="<?php $permalink; ?>" class="link">Learn more</a>
      </div>

      <div class="col">
        <i class="fas fa-comments"></i>
        <h3>Get in touch</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis est. Aenean mollis tellus efficitur 
          nunc egestas blandit. In eget vestibulum risus. Cras nulla felis, fermentum eu rutrum vel, porta sed est. 
          Proin fermentum tincidunt dui, sed viverra tellus mollis quis. Morbi dapibus ante sit amet neque lacinia scelerisque.
        </p>
        <a href="<?php get_permalink( get_page_by_path( '/contact') ); ?>" class="link">Learn more</a>
      </div>

      <div class="col">
        <i class="fas fa-building"></i>
        <h3>Register hotels</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis est. Aenean mollis tellus efficitur 
          nunc egestas blandit. In eget vestibulum risus. Cras nulla felis, fermentum eu rutrum vel, porta sed est. 
          Proin fermentum tincidunt dui, sed viverra tellus mollis quis. Morbi dapibus ante sit amet neque lacinia scelerisque.
        </p>
        <a href="<?php get_permalink( get_page_by_path( '/login') ); ?>" class="link">Learn more</a>
      </div>

    </div>
  </div>
</section>

-->