<template>
  <div class="product-quantity">
    <button
      class="product-quantity__btn minus"
      @click="decreaseQuantity(dishId)"
      :disabled="!inputPositive(dishId)"
    >
      <font-awesome-icon :icon="['fas', 'minus']" />
    </button>
    <input
      class="product-quantity__input"
      type="number"
      :value="inputNumber(dishId)"
      readonly
    />
    <button
      class="product-quantity__btn plus"
      @click="increaseQuantity(dishId)"
    >
      <font-awesome-icon :icon="['fas', 'plus']" />
    </button>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useCartStore } from '@/stores/cart'

  const cart_store = useCartStore()
  const { increaseQuantity, decreaseQuantity } = cart_store
  const { inputPositive } = storeToRefs(cart_store)

  const { dishId } = defineProps(['dishId'])

  const inputNumber = computed(() => {
    return (dishId) => {
      return cart_store.isItemInCart(dishId).quantity
    }
  })
</script>

<style lang="scss" scoped>
  .product-quantity {
    display: flex;
    align-items: center;
	//  justify-content: center;
    max-width: toRem(130);
   //  padding: 0.5rem;
   //  border: 2px solid $color2;
    border-radius: 0.5rem;
    &__btn {
      width: 30px;
      height: 30px;
      background-color: $color-btn;

      &[disabled] {
        color: rgba(79, 68, 62, 0.3);
      }

      &.minus,
      &.plus {
        border: 0.5px solid $text-color;
        border-radius: 0.5rem;
      }
    }
    &__input {
      width: 40px;
      text-align: center;
		-moz-appearance: textfield;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        
      }
    }
  }
</style>
