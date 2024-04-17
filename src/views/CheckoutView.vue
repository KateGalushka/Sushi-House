<template>
  <main-master-page>
    <div class="checkout wrapper">
      <section class="checkout__section">
        <cart-component :user-cart="userCart" />
      </section>
      <section class="checkout__section ordering">
        <h2>Оформлення замовлення</h2>
        <div class="ordering__delivery">
          <label for="pickup">
            <input
              type="radio"
              id="pickup"
              name="delivery"
              value="pickup"
              v-model="deliveryMethod"
            />
            <font-awesome-icon :icon="['fas', 'bag-shopping']" />&nbsp;
            <span>Самовивіз</span>
          </label>

          <label for="courier">
            <input
              type="radio"
              id="courier"
              name="delivery"
              value="courier"
              v-model="deliveryMethod"
            />
            <font-awesome-icon :icon="['fas', 'truck-fast']" />&nbsp;
            <span>Доставка кур'єром</span>
          </label>
        </div>
        <form class="ordering__form">
          <label class="ordering__form-label"
            >Контакти
            <div class="ordering__form-contacts">
              <input
                type="text"
                placeholder="Вкажіть ім'я"
                required
              />
              <input
                type="tel"
                placeholder="Вкажіть телефон"
                required
              />
              <input
                type="email"
                placeholder="Вкажіть email"
              />
            </div>
          </label>
          <label class="ordering__form-label"
            >Дата та час
            <div class="ordering__form-time">
              <select v-model="dayOfDelivery">
                <option
                  selected
                  :value="new Date().toLocaleDateString('uk-UA')"
                >
                  Сьогодні
                </option>
                <option
                  v-for="(day, index) in daysArray"
                  :key="index"
                  :value="day"
                >
                  {{ day }}
                </option>
              </select>
              <select v-model="timeOfDelivery">
                <option
                  selected
                  :value="new Date().toLocaleTimeString('uk-UA')"
                >
                  Найближче
                </option>
                <option
                  v-for="(hour, index) in hoursArray"
                  :key="index"
                  :value="hour"
                >
                  {{ hour }}
                </option>
              </select>
            </div>
          </label>
          <label class="ordering__form-label"
            >Адреса
            <div class="ordering__form-adress">
              <input
                type="text"
                placeholder="Вкажіть адресу доставки"
              />
            </div>
          </label>
          <label class="ordering__form-label"
            >Коментарій
            <div class="ordering__form-comment">
              <input
                type="text"
                placeholder="Коментарій"
              />
            </div>
          </label>

          <div class="ordering__form-pay">
				<h3 class="ordering__form-label">Спосіб оплати</h3>
       
            <label for="cash">
              <input
                type="radio"
                id="cash"
                value="cash"
					 name="payMethod"
              />
				  <span>Готівкою</span>
            </label>
            <label for="googlePay">
              <input
                type="radio"
                id="googlePay"
                value="googlePay"
					 name="payMethod"
              />
				  <span>GooglePay</span>
            </label>
          </div>
			 <input type="submit" class="button" value="Замовити">
        </form>
      </section>
    </div>
  </main-master-page>
</template>

<script setup>
  import MainMasterPage from '@/masterPages/MainMasterPage.vue'
  import CartComponent from '@/components/CartComponent.vue'
  import { ref, computed } from 'vue'

  import { storeToRefs } from 'pinia'

  import { useCartStore } from '@/stores/cart'
  const cart_store = useCartStore()
  const { userCart } = storeToRefs(cart_store)

  const deliveryMethod = ref('')

  const dayOfDelivery = ref(new Date().toLocaleDateString('uk-UA'))
  const timeOfDelivery = ref(new Date().toLocaleTimeString('uk-UA'))

  const daysArray = computed(() => {
    let now = Date.now()
    let days = []
    for (let i = 0; i < 5; i++) {
      let day = new Date(now + i * 1000 * 60 * 60 * 24)
      days.push(day.toLocaleDateString('uk-UA'))
    }
    return days
  })

  const hoursArray = computed(() => {
    let now = Date.now()
    let hours = []
    for (let i = 0; i < 10; i++) {
      let hour = new Date(now + i * 1000 * 60 * 15)
      console.log(hour.getHours())
      if (hour.getHours() >= 10 && hour.getHours() <= 20) {
        hours.push(hour.toLocaleTimeString('uk-UA'))
      }
    }
    return hours
  })
</script>

<style lang="scss" scoped>
  .checkout {
    margin-top: toRem(150);
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      padding-bottom: 0.5em;
      border-bottom: 1px solid $text-color;
    }
    &__section {
    }

    .ordering {
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      &__delivery, &__form-pay {
        display: flex;
        gap: 2rem;
        input {
          -webkit-appearance: none;
          appearance: none;
        }
        label {
          padding: 0.5rem 1rem;
          border: 1px solid $text-color;
          border-radius: 0.5rem;
          &:hover,
          &:focus {
            outline: 2px solid $color2;
          }
        }
        label:has(input:checked) {
          background-color: $color-btn;
        }
      }
      &__form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        input[type='text'],
        input[type='tel'],
        input[type='email'],
        select {
          padding: 0.5rem 1rem;
          margin: 1rem 0;
          background-color: rgba(241, 238, 236, 0.5);
          border: 1px solid $text-color;
          border-radius: 0.5rem;
          position: relative;
          font-weight: normal;
          &::placeholder {
            opacity: 0.5;
            font-size: 0.875rem;
          }
        }

        &-label {
          display: block;
          font-weight: 600;
        }
        &-contacts {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          input {
            min-width: toRem(200);
          }
          input:not(:last-of-type)::after {
            content: '*';
            color: red;
            position: absolute;
            display: inline-block;
            height: 1rem;
            width: 1rem;
            right: 0;
            top: 0;
          }
        }
        &-time {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          select {
            min-width: toRem(200);
            font-size: 1rem;
            font-family: inherit;
          }
        }
        &-adress, &-comment {
          input {
            min-width: toRem(400);
          }
        }
		  &-pay {
			h3 {
				font-family: $font-body;
			}
		  }
		 
      }
    }
  }
</style>
