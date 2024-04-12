<template>
  <header>
    <nav-bar />
    <vertical-menu />
  </header>
  <main>
    <slot></slot>
    <cart-component :cart-items-count="cartItemsCount" :user-cart="cart_store.userCart" />
  </main>
  <footer>
    <footer-component />
  </footer>
</template>

<script setup>
  import NavBar from '@/components/NavBar.vue'
  import VerticalMenu from '@/components/VerticalMenu.vue'
  import FooterComponent from '@/components/FooterComponent.vue'
  import CartComponent from '@/components/CartComponent.vue'
//   import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useCartStore } from '@/stores/cart'
  const cart_store = useCartStore()
  const { cartItemsCount } = storeToRefs(cart_store)

</script>

<style lang="scss" scoped></style>
