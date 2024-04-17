<template>
  <section>
    <div class="cart__content">
      <div class="cart__header">
        <slot name="close-button"></slot>
        <h2>Ваш кошик:</h2>
      </div>
      <div class="cart__main">
        <div v-if="!cartItemsCount">Ваш кошик поки що порожній.</div>
        <div
          v-else
          class="cart-item"
          v-for="item in userCart"
          :key="item.id"
        >
          <img
            v-if="getImagePath(getDishById(item.id).img_name)"
            :src="getImagePath(getDishById(item.id).img_name)"
            :alt="getDishById(item.id).title"
            width="100"
          />
          <!-- <img v-if="dishUrl(item.id)" :src="dishUrl(item.id)" :alt="getDishById(item.id).title" width="200"> -->
          <img
            v-else
            :src="dummyImagePath"
            alt="dish_image"
            width="100"
          />
          <div class="cart-item__descr">
            <h3>{{ getDishById(item.id).title }}</h3>
            <quantity-input :dish-id="item.id" />
            <p>Сума: {{ item.quantity * getDishById(item.id).price }} грн</p>
          </div>
          <button
            class="delete"
            @click="cart_store.deleteItemFromCart(item.id)"
          >
            <font-awesome-icon
              :icon="['far', 'trash-can']"
              size="xl"
            />
          </button>
        </div>
      </div>

      <div class="cart__footer">
        <div class="total">
          Разом: <span>{{ cartTotalSum }}</span> грн
        </div>
        <slot name="footer-buttons"></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
  import QuantityInput from '@/components/QuantityInput.vue'

  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useCartStore } from '@/stores/cart'
  const cart_store = useCartStore()
  const { cartItemsCount, cartTotalSum } = storeToRefs(cart_store)

  import { useDishesStore } from '@/stores/dishes'
  const dishes_store = useDishesStore()
  const { getDishById } = storeToRefs(dishes_store)

  const props = defineProps({
    userCart: {
      type: Array,
      required: true
    }
  })

  const dishUrl = computed(() => {
    return (dishId) => {
      let dish = dishes_store.getDishById(dishId)
      return storage.getImagesPaths.find((path) => path.includes(dish.img_name))
    }
  })
  const dummyImagePath = new URL('../assets/images/sushi-illustration.png', import.meta.url).href;
  const getImagePath = (imgPath) =>
    new URL(`../assets/images/sushi/${imgPath}`, import.meta.url).href;

</script>

<style lang="scss" scoped>
  .cart {
    &__content {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      padding: 1rem;
      gap: 1.5rem;
    }

    &__header {
      padding-bottom: 0.5em;
      border-bottom: 1px solid $text-color;
      h2 {
        font-size: 1.75rem;
        font-weight: 600;
      }
    }

    &__main {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    &__footer {
      border-top: 1px solid $text-color;
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      .total {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        span {
          color: $color2;
        }
      }
    }
  }

  .cart-item {
    display: flex;
    // justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;

    img {
      max-width: toRem(150);
      object-fit: cover;
      aspect-ratio: 1/1;
    }

    &__descr {
      flex: 1 1 toRem(250);
      h3,
      div {
        margin-bottom: 1rem;
      }
      h3 {
        font-size: 1.25rem;
        color: $color2;
      }
    }
  }

  button.delete {
    margin-left: auto;
    &:hover {
      color: $color2;
    }
  }
</style>
