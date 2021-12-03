<?php /* Template Name: Template Login */ ?>
<?php
  get_header();
?>

<?php
  get_header();
?>

<main>
  <section class="login-form-section">
    <div class="container">
      <div class="login-heading">
        <h1>Login</h1>
      </div>
      <div class="login-form-body">
        <div class="form_submission_errors" id="lform_validation_errors"></div>
        <form id="login-form">
          <div class="login-form-content">

            <div class="field">
              <label for="loginUsername">Username/email</label>
              <div class="input_container">
                <input type="text" name="loginUsername" id="loginUsername" required/>
              </div>
            </div>

            <div class="field">
              <label for="loginPassword">Password</label>
              <div class="input_container">
                <input type="password" name="loginPassword" id="loginPassword" required/>
              </div>
            </div>


          </div>
          <button type="submit" class="btn-primary form_button">Login</button>
        </form>
      </div>

      <hr>

      <div class="lform-below">
        <small>
          Not registered? <a href="<?= get_permalink( get_page_by_path( '/register') ); ?>" class="lform-link">Create an account</a>
        </small>
      </div>
    </div>
  </section>
</main>


<?php get_template_part( 'templates/blocks/newsletter' ); ?>

<?php
  get_footer();
?>