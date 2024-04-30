<template>
   <button
      class="cart__button" :class="{wobbling: isAnimated}"
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
                  <button
                     class="button"
                     :disabled="!cartItemsCount"
                     @click="goToCheckout"
                  >
                     Оформити замовлення
                  </button>
               </template>
            </CartComponent>
         </div>
      </div>
   </Transition>
</template>

<script setup>
   import { ref } from 'vue';
   import { storeToRefs } from 'pinia';
   import CartComponent from '@/components/CartComponent.vue';

   import { useCartStore } from '@/stores/cart';
   const cart_store = useCartStore();
   const { cartItemsCount, userCart, isAnimated } = storeToRefs(cart_store);

   import { useRouter } from 'vue-router';
	const router = useRouter();

   const props = defineProps({
      cartItemsCount: {
         type: Number,
         default: 0
      }
   });

   const isOpen = ref(false);

   function onOpenSidebarCart() {
      isOpen.value = true;
      document.body.style.overflow = 'hidden';
   }
   function onCloseSidebarCart() {
      isOpen.value = false;
      document.body.style.overflow = '';
   }

   function goToMenu() {
      onCloseSidebarCart();
      router.push({
         name: 'menu'
      });
   }
   function goToCheckout() {
      onCloseSidebarCart();
      router.push({
         name: 'checkout'
      });
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
      &.wobbling {
         animation: wobble 0.5s;
         animation-iteration-count: 1;
      }
   }
   @keyframes wobble {
      0%,
      100% {
         //  transform: translateX(0%);
         transform-origin: 50% 50%;
         transform: rotate(0deg) scale(1);
      }

      15% {
         transform: rotate(-24deg) scale(1.1);
      }

      30% {
         transform: rotate(20deg) scale(1.2);
      }

      45% {
         transform: rotate(-16deg) scale(1.2);
      }

      60% {
         transform: rotate(8deg) scale(1.1);
      }

      75% {
         transform: rotate(-4deg) scale(1.1);
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
