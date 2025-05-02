<template>
  <footer class="site-footer">
    <div class="footer-top">
      <div class="logo">Zoo GOODS</div>
      <nav class="footer-nav">
        <a href="#">關於我們</a>
        <a href="#">購物須知</a>
        <a href="#">聯絡我們</a>
        <a href="#">隱私政策</a>
      </nav>
      <div class="social-media">
        <a href="#"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
        <a href="#"><font-awesome-icon :icon="['fab', 'line']" /></a>
        <a href="#"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 Zoo GOODS. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped lang="scss">
.site-footer {
  background: $color-header-bg;
  color: $color-light-text;
  padding: 24px 16px;
  font-size: 14px;

  .footer-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .logo {
      font-size: 20px;
      font-weight: bold;
    }

    .footer-nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;

      a {
        color: $color-light-text;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .social-media {
      display: flex;
      gap: 12px;

      a {
        font-size: 18px;
        color: $color-light-text;
      }
    }
  }

  .footer-bottom {
    margin-top: 16px;
    text-align: center;
    font-size: 12px;
    opacity: 0.8;
  }
}
</style>
