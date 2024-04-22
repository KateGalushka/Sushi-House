<template>
  <div
    class="navbar"
    :class="{ open: isMenuOpen }"
  >
    <router-link
      to="/"
      class="navbar__logo"
    >
      <img
        class="navbar__logo-img"
        src="../assets/images/logo-SH.png"
        alt="logo Sushi House"
      />
      <p class="navbar__logo-text">Sushi <span>H</span>ouse</p>
    </router-link>
    <!-- <div class="navbar__menu-links navbar__tel">
		</div>  -->

    <button
      class="navbar__burger-btn"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="navbar__menu">
      <nav class="navbar__menu-links">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'house']" />
          &nbsp;Головна
        </router-link>
        <router-link :to="{ name: 'menu' }">
          <!-- <font-awesome-icon :icon="['fas', 'list']" /> -->
          <font-awesome-icon :icon="['fas', 'utensils']" />
          &nbsp;Меню
        </router-link>

        <a
          href="#"
          class="viber"
        >
          <font-awesome-icon
            :icon="['fab', 'viber']"
            style="font-size: x-large"
          />
        </a>
        <a href="tel:08001112233">
          <font-awesome-icon :icon="['fas', 'phone']" />
          <span style="white-space: nowrap">&nbsp; 0-800-111-22-33</span>
        </a>
      </nav>
      <div class="navbar__user">
        <user-profile-component />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import UserProfileComponent from './UserProfileComponent.vue'

  const isMenuOpen = ref(false)
  function toggleMenu() {
    return (isMenuOpen.value = isMenuOpen.value ? false : true)
  }
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 2em;
    position: fixed;
    max-width: 100%;
    width: 100%;
    top: 0;
    left: 0;
    // background-color: rgba(255, 248, 243, 0.8);
    background-color: $bg-color1;
    z-index: 10;
    &__logo {
      display: flex;
      align-items: center;
      gap: 0.5em;
      z-index: 25;
      &-img {
        width: clamp(3rem, 2.4rem + 3vw, 6rem);
      }
      &-text {
        font-size: clamp(0.875rem, 0.75rem + 0.625vw, 1.5rem);
        font-family: $font-title2;
        font-weight: 600;
        text-transform: uppercase;
        span {
          color: $color2;
        }
      }
    }
    &__burger-btn {
      position: relative;
      width: 40px;
      height: 40px;
      // margin-right: 1em;
      display: none;
      background-color: transparent;
      border: none;
      outline: none;
      z-index: 15;
      span {
        position: absolute;
        display: block;
        width: 30px;
        height: 4px;
        left: 5px;
        color: $text-color;
        background-color: $text-color;
        transition: all 0.4s ease-out;
        &:nth-child(1) {
          transform: translateY(-10px);
        }
        &:nth-child(3) {
          transform: translateY(10px);
        }
      }
    }
    &__menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 4;
      gap: clamp(1rem, 2rem, 3rem);
      &-links {
        display: flex;
        gap: 1rem;
        line-height: 1.25;
        text-align: center;
        a {
          font-weight: bold;
          transition: all 0.3s ease-in;
          margin: 0 0.75em;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            background-color: $color2;
            height: 3px;
            width: 0;
            left: 50%;
            bottom: -5px;
            transition: 0.3s;
            border-radius: 1rem;
          }
          &:hover::after {
            width: 100%;
            left: 0;
          }
          &.viber:hover {
            color: rgb(109, 28, 180);
          }
          &.router-link-exact-active {
            color: $color2;
          }
        }
      }
    }

    &__user {
      padding-bottom: 0.5rem;
    }
  }

  @media (max-width: toRem(992)) {
    .navbar__burger-btn {
      display: block;
    }
    .navbar__menu {
      position: absolute;
      top: -22rem;
      right: 0;
      min-height: 100vh;
      min-width: 50%;
      flex-direction: column;
      align-items: end;
      justify-content: start;
      gap: 1rem;
      background-color: $bg-color1;
      padding: 4rem 2rem;
      visibility: hidden;
      transition: transform 0.5s ease-out;
      &-links {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      a {
        padding: 0.375rem 0;
      }
    }

    .navbar.open {
      .navbar__menu {
        transform: translateY(25rem);
        opacity: 0.95;
        visibility: visible;
        font-size: 1.125rem;
      }
      .navbar__burger-btn span {
        background-color: $text-color;
      }
      .navbar__burger-btn span:nth-child(1) {
        transform: translateY(0) rotate(45deg);
      }
      .navbar__burger-btn span:nth-child(2) {
        opacity: 0;
      }
      .navbar__burger-btn span:nth-child(3) {
        transform: translateY(0) rotate(-45deg);
      }
    }

    .navbar__user {
      padding-right: 0.5rem;
    }
  }
  @media (max-width: toRem(768)) {
    .navbar__menu {
      height: 23.75rem;
      a {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: toRem(530)) {
    .navbar__menu {
      width: 100%;
      padding-top: 5rem;
    }
    .navbar__menu,
    .navbar__menu-links,
    .navbar__user {
      align-items: center;
    }
  }
</style>
