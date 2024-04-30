<template>
   <div class="card">
      <div class="card__img">
         <!-- <img
        v-if="getImagePath(dish.img_name)"
        :src="getImagePath(dish.img_name)"
        width="200"
      /> -->
         <img
            v-if="dishUrl"
            :src="dishUrl"
            :alt="dish.title"
            width="200"
         />
         <img
            v-else
            :src="dummyImagePath"
            :alt="dish.title"
            width="200"
         />
      </div>

      <h3 class="card__title">{{ dish.title }}</h3>

      <div class="card__descr">
         <p>{{ dish.description }}</p>
         <p>{{ dish.weight }}г</p>
      </div>
      <div class="card__price">{{ dish.price }} грн.</div>

      <div class="card__buy">
         <quantity-input
            v-if="isItemInCart(dish.id)"
            :dish-id="dish.id"
         />

         <button
            v-else
            class="button card__button"
            @click="cart_store.addItemToCart(dish.id)"
         >
            <span> В кошик </span>
         </button>
      </div>
   </div>
</template>

<script setup>
   import { computed, ref } from 'vue';
   import { storeToRefs } from 'pinia';
   import QuantityInput from '@/components/QuantityInput.vue';

   import { useStorageStore } from '@/stores/storage';
   const storage = useStorageStore();

   import { useCartStore } from '@/stores/cart.js';
   const cart_store = useCartStore();
   const { isItemInCart } = storeToRefs(cart_store);

   const props = defineProps({
      dish: {
         type: Object,
         required: true
      }
   });

   const dishUrl = computed(() => {
      return storage.getImagesPaths.find((path) => path.includes(props.dish.img_name));
   });
   const dummyImagePath = new URL('../assets/images/sushi-illustration.png', import.meta.url).href;

   //   const getImagePath = (imgPath) =>
   //     new URL(`../assets/images/sushi/${imgPath}`, import.meta.url).href
</script>

<style lang="scss" scoped>
   .card {
      width: toRem(300);
      // border: 1px solid red;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      text-align: center;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      &__img {
         width: calc(toRem(300) - 2rem);
         overflow: hidden;
         img {
            width: 100%;
            object-fit: cover;
            aspect-ratio: 1/1;
            transition: all 0.5s ease;
            &:hover {
               transform: scale(1.1);
            }
         }
      }

      &__title {
        font-size: clamp(1.5rem, 1.4167rem + 0.4167vw, 1.75rem);
         font-weight: 600;
         color: $color2;
      }
      &__descr {
         line-height: 125%;
      }
      &__price {
         font-size: 1.5rem;
         font-weight: 600;
      }
   }
   .card__buy {
      display: flex;
      justify-content: space-between;
      align-items: center;
      //  margin-top: 1em;
      gap: 1rem;
   }
   //   .product-quantity {
   //     display: flex;
   //     align-items: center;
   //     flex-wrap: nowrap;
   //     background-color: $color2-hover;
   //     &__btn {
   //       width: 40px;
   //       height: 40px;
   //       background-color: $bg-color1;
   //       &[disabled] {
   //         color: rgba(79, 68, 62, 0.3);
   //       }
   //       &.minus {
   //         border-right: 0.5px solid $text-color;
   //       }
   //       &.plus {
   //         border-left: 0.5px solid $text-color;
   //       }
   //     }
   //     &__input {
   //       width: 45px;
   //       background-color: inherit;
   //       text-align: center;
   //       &::-webkit-inner-spin-button,
   //       &::-webkit-outer-spin-button {
   //         -webkit-appearance: none;
   //       }
   //     }
   //   }
</style>
