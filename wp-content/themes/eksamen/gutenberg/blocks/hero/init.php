<?php

function render_hero($attributes)
{
  return '
    <section class="hero">
		<div class="hero__content">
			<h1 class="hero__title">' . $attributes['title'] . '</h1>
			<a href=" ' . $attributes['linkUrl'] .  ' " class="btn btn--green">' . $attributes['linkText'] . '</a>
        </div>
        <div class="hero__svg" data-icon="' . $attributes['illustration'] . '"></div>
	</section>';
}
