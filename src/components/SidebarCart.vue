<template>
  <button
    class="cart__button"
    @click="onOpenSidebarCart"
  >
    <font-awesome-icon
      :icon="['fas', 'basket-shopping']"
      size="2xl"
    />
    <span class="cart__button-badge">{{ cartItemsCount }}</span>
  </button>

  <Transition name="slide-right">
    <div
      v-if="isOpen"
      class="sidebar-cart__overlay"
      :class="{ open: isOpen }"
    >
      <div class="sidebar-cart">
        <CartComponent :user-cart="userCart">
          <template #close-button>
            <button
              class="close"
              @click="onCloseSidebarCart"
            >
              <font-awesome-icon
                :icon="['far', 'circle-xmark']"
                size="xl"
              />
            </button>
          </template>
          <template #footer-buttons>
            <button
              class="button"
              @click="goToMenu"
            >
              Обрати ще
            </button>
            <button class="button" @click="goToCheckout">Оформити замовлення</button>
          </template>
        </CartComponent>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import CartComponent from '@/components/CartComponent.vue'
  import { useRouter } from 'vue-router'

  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useCartStore } from '@/stores/cart'
  const cart_store = useCartStore()
  const { cartItemsCount, userCart } = storeToRefs(cart_store)

    const props = defineProps({
      cartItemsCount: {
        type: Number,
        default: 0
      },

    })

  const isOpen = ref(false)

  function onOpenSidebarCart() {
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }
  function onCloseSidebarCart() {
    isOpen.value = false
    document.body.style.overflow = ''
  }

  const router = useRouter();
  function goToMenu() {
    onCloseSidebarCart();
    router.push({
      name: 'menu'
    })
  }
  function goToCheckout() {
	 onCloseSidebarCart();
    router.push({
      name: 'checkout'
    })

  }
</script>

<style lang="scss" scoped>
  .cart__button {
    position: fixed;
    bottom: 10%;
    right: 5%;
    border: 3px solid $color2;
    border-radius: 25%;
    padding: 0.75rem;
    background-color: $bg-color1;
    box-shadow:
      5px 5px 2px rgba(0, 0, 0, 0.03),
      0 4px 10px rgba(0, 0, 0, 0.17);

    &:hover,
    &:focus {
      background-color: $color-btn;
    }

    &-badge {
      position: absolute;
      display: grid;
      place-items: center;
      min-width: 30px;
      min-height: 30px;
      top: -20%;
      right: -15%;
      border: 3px solid $text-color;
      border-radius: 35%;
      background-color: $text-color;
      color: #fff;
      padding: 2px;
      z-index: 5;
    }
  }

  .sidebar-cart__overlay {
    position: fixed;
    z-index: 999;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .sidebar-cart {
    position: fixed;
    z-index: 1000;
    right: 0;
    bottom: 0;
    top: 0;
    opacity: 1;
    min-width: 30%;
    background-image: url('@/assets/images/bg.webp');
    overflow: scroll;

    button.close {
      display: block;
      margin: 0 0 0.25em auto;

      svg:hover {
        color: $color2;
      }
    }
  }

  .slide-right-enter-from,
  .slide-right-leave-to {
    // opacity: 0;
    transform: translateX(100%);
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all 0.4s ease-in-out;
  }

  .slide-right-enter-to,
  .slide-right-leave-from {
    transform: translateX(0);
  }
</style>
