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
  <section>
    <Transition name="slide-right">
      <div
        v-if="isOpen"
        class="sidebar-cart__overlay"
        :class="{ open: isOpen }"
      >
        <div class="sidebar-cart">
          <div class="sidebar-cart__content">
            <div class="sidebar-cart__header">
              <button
                class="close"
                @click="onCloseSidebarCart"
              >
                <font-awesome-icon
                  :icon="['far', 'circle-xmark']"
                  size="xl"
                />
              </button>
              <h2>Ваш кошик:</h2>
            </div>
            <div class="sidebar-cart__main">
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
                  :alt="getDishById(item.id).title"
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

            <div class="sidebar-cart__footer">
              <div class="total">
                Разом: <span>{{ cartTotalSum }}</span> грн
              </div>
              <button
                class="button"
                @click="goToMenu"
              >
                Обрати ще
              </button>
              <button class="button">Оформити замовлення</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
  import QuantityInput from '@/components/QuantityInput.vue';
  import { useRouter } from 'vue-router';

  import { ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useStorageStore } from '@/stores/storage';
  const storage = useStorageStore();

  import { useCartStore } from '@/stores/cart';
  const cart_store = useCartStore();
  const { cartItemsCount, cartTotalSum } = storeToRefs(cart_store);

  import { useDishesStore } from '@/stores/dishes';
  const dishes_store = useDishesStore();
  const { getDishById } = storeToRefs(dishes_store);

  const props = defineProps({
    cartItemsCount: {
      type: Number,
      default: 0
    },
    userCart: {
      type: Array,
      required: true
    }
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

  const dishUrl = computed(() => {
	return (dishId) => {
		let dish = dishes_store.getDishById(dishId);
		return storage.getImagesPaths.find((path) => path.includes(dish.img_name));
	}
  })
  const dummyImagePath = new URL('../assets/images/sushi-illustration.png', import.meta.url).href;
  const getImagePath = (imgPath) =>
    new URL(`../assets/images/sushi/${imgPath}`, import.meta.url).href;

  const router = useRouter()
  function goToMenu() {
    onCloseSidebarCart()
    router.push({
      name: 'menu'
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

      button.close {
        display: block;
        margin: 0 0 0.25em auto;

        svg:hover {
          color: $color2;
        }
      }

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
