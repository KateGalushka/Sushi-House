<template>
  <main-master-page>
    <div class="checkout wrapper">
      <section class="checkout__section ordering">
        <h2>Оформлення замовлення</h2>
        <form
          class="ordering__form"
          ref="form"
          id="form"
          @submit.prevent="handleFormSubmit"
        >
          <div class="ordering__delivery">
            <label for="pickup">
              <input
                type="radio"
                id="pickup"
                name="delivery"
                value="pickup"
                checked
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

          <!-- <form
          class="ordering__form"
			 ref="form"
			 id="form"
			 @submit.prevent="handleFormSubmit"
        > -->
          <label class="ordering__form-label"
            >Контакти
            <div class="ordering__form-contacts">
              <div>
                <input
                  type="text"
                  placeholder="Вкажіть ім'я*"
                  required
						minlength="4"
                  name="userName"
                  v-model="user.name"
                />
                <span></span>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Вкажіть телефон: (XXX)-XXX-XX-XX"
                  maxlength="15"
                  required
                  name="userPhone"
                  v-model="user.phone"
                />
                <span></span>
                <p
                  v-if="isRemarkVisible"
                  class="ordering__form-contacts remark"
                >
                  Введіть номер телефона у форматі 0XX-XXX-XX-XX
                </p>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Вкажіть email"
                  name="userEmail"
                  v-model="user.email"
                />
              </div>
              <!-- <p class="ordering__form-contacts remark">* - обов'язкові поля</p> -->
            </div>
          </label>
          <label class="ordering__form-label"
            >Дата та час
            <div class="ordering__form-time">
              <select
                v-model="dayOfDelivery"
                name="dayOfDelivery"
              >
                <option :value="new Date().toLocaleDateString('uk-UA')">Сьогодні</option>
                <option
                  v-for="(day, index) in daysArray"
                  :key="index"
                  :value="day"
                >
                  {{ day }}
                </option>
              </select>
              <select
                v-model="timeOfDelivery"
                name="timeOfDelivery"
              >
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
          <label
            v-if="deliveryMethod == 'courier'"
            class="ordering__form-label"
            >Адреса
            <div class="ordering__form-address">
              <input
                type="text"
                v-model="user.address"
                required
                placeholder="Вкажіть адресу доставки*"
                name="userAddress"
              />
              <span></span>
            </div>
          </label>
          <label class="ordering__form-label"
            >Коментарій
            <div class="ordering__form-comment">
              <input
                type="text"
                v-model="user.comment"
                placeholder="Коментарій"
                name="userComment"
              />
            </div>
          </label>
          <p class="ordering__form-contacts remark">* - обов'язкові поля</p>

          <div class="ordering__form-pay">
            <h3 class="ordering__form-label">Спосіб оплати</h3>
            <div>
              <label for="cash">
                <input
                  type="radio"
                  v-model="payMethod"
                  id="cash"
                  value="cash"
                  name="payMethod"
                  checked
                />
                <span>Готівкою</span>
              </label>
              <label for="googlePay">
                <input
                  type="radio"
                  v-model="payMethod"
                  id="googlePay"
                  value="googlePay"
                  name="payMethod"
                />
                <span>GooglePay</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="button"
          >
            Замовити
          </button>
        </form>
      </section>
      <section class="checkout__section cart">
        <cart-component :user-cart="userCart" />
        <router-link
          :to="{ name: 'menu' }"
          class="button cart__link"
          >Додати ще товари в замовлення</router-link
        >
      </section>
    </div>
  </main-master-page>
</template>

<script setup>
  import MainMasterPage from '@/masterPages/MainMasterPage.vue'
  import CartComponent from '@/components/CartComponent.vue'
  import { notify } from '../stores/helpers/toastify.js';
  import { ref, computed, watch, onMounted } from 'vue'

  import { useRouter } from 'vue-router'
  const router = useRouter()

  import { storeToRefs } from 'pinia'

  import { useCartStore } from '@/stores/cart'
  const cart_store = useCartStore()
  const { userCart, cartWithTitles } = storeToRefs(cart_store)

  import { useOrdersStore } from '@/stores/orders'
  const orders_store = useOrdersStore()
  const { currentOrderSubmit } = storeToRefs(orders_store)

  const form = ref(null)

  const deliveryMethod = ref('pickup')
  const user = ref({})
  const payMethod = ref('cash')
  const dayOfDelivery = ref(new Date().toLocaleDateString('uk-UA'))
  const timeOfDelivery = ref(new Date().toLocaleTimeString('uk-UA'))

  const daysArray = computed(() => {
    let now = Date.now()
    let days = []
    for (let i = 1; i < 5; i++) {
      let day = new Date(now + i * 1000 * 60 * 60 * 24)
      days.push(day.toLocaleDateString('uk-UA'))
    }
    return days
  })
  const currentHour = ref(new Date().getHours())

  const hoursArray = computed(() => {
    let times = []
    for (let i = 1; i < 11; i++) {
      let hour = currentHour.value + i
      if (hour < 10 || hour >= 20) {
        continue
      } else {
        for (let j = 0; j < 60; j += 15) {
          let minutes = j
          let time = new Date().setHours(hour, minutes)
          times.push(
            new Date(time).toLocaleTimeString('uk-UA', {
              hour: '2-digit',
              minute: '2-digit'
            })
          )
        }
      }
      // console.log('times: ', times)
    }
    return times
  })

  const phoneRegExp = /^\(0\d{2}\)[ -]?\d{3}[ -]?\d{2}[- ]?\d{2}$/
  const isPhoneNumberValid = computed(() => phoneRegExp.test(user.value.phone))
  const isRemarkVisible = computed(()=> user.value.phone && !isPhoneNumberValid.value)
  
  watch(
    [() => dayOfDelivery.value, () => user.value.phone],
    ([newDayOfDelivery, newUserPhone], [oldDayOfDelivery, oldUserPhone]) => {
      if (new Date(newDayOfDelivery).getDate() !== new Date().getDate()) {
        currentHour.value = 9
      }

      if (newUserPhone?.length > oldUserPhone?.length) {
        user.value.phone = newUserPhone.replace(/\D/g, '')
          						.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/g, `($1) $2-$3-$4`)
      }
    }
  )

  const handleFormSubmit = async () => {
	if (!user.value.name || !isPhoneNumberValid.value) {
		notify('', "Заповніть, будь ласка, обов'язкові поля в правильному форматі")
		return
	} else {
    // let formData = new FormData(form.value);
    // formData.append('order', userCart.value)
    let formData = {
      deliveryMethod: deliveryMethod.value,
      payMethod: payMethod.value,
      user: {
        name: user.value.name,
        phone: user.value.phone,
        email: user.value.email ?? '',
        comment: user.value.comment ?? ''
      },
      date: {
        day: dayOfDelivery.value,
        time: timeOfDelivery.value
      },
      order: cartWithTitles.value
	   }
    await orders_store.addOrder(formData)

    console.log('currentOrderSubmit in checkout: ', currentOrderSubmit.value)
    if (currentOrderSubmit.value) {
      clearData()
      clearLocalStorage()
      setTimeout(() => router.push({ name: 'home' }), 3000)
    }
	}
  }

  const clearData = () => {
    deliveryMethod.value = ''
    payMethod.value = ''
    user.value = {}
    dayOfDelivery.value = new Date().toLocaleDateString('uk-UA')
    timeOfDelivery.value = new Date().toLocaleTimeString('uk-UA')
    userCart.value = []
  }
  const clearLocalStorage = () => {
    localStorage.removeItem('cart')
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
      event.preventDefault()
      let formArray = Array.from(form.value.elements)
      let index = formArray.indexOf(event.target)
      if (index !== -1) {
        formArray[index + 1].focus()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .checkout {
    margin: toRem(150) auto 0;
    padding: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2rem;
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid $text-color;
    }
    &__section {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .ordering {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      // flex-grow: 1;
      // flex-shrink: 1;

      &__delivery,
      &__form-pay {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
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
            outline: 2px solid $color-btn;
          }
        }
        label:has(input:checked) {
          background-color: $color-btn;
        }
      }
      &__form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        div {
          margin: 0.75rem 0;
        }
        input[type='text'],
        input[type='tel'],
        input[type='email'],
        select {
          padding: 0.5rem 1rem;
          background-color: rgba(241, 238, 236, 0.5);
          border: 1px solid $text-color;
          border-radius: 0.5rem;
          font-weight: normal;
          &::placeholder {
            opacity: 0.5;
            font-size: 0.875rem;
          }
          &:focus {
            outline: 2px solid $color-btn;
          }
          &:invalid {
            border: 1px solid red;
          }
        }
        input:required + span::after {
          content: ' *';
          color: red;
        }

        &-label {
          display: block;
          font-weight: 600;
        }
        &-contacts {
          input {
            width: clamp(toRem(200), toRem(400), calc(100% - 1rem));
          }
          &.remark {
            font-size: 0.75rem;
            color: red;
            margin-top: 0.5rem;
          }
        }
        &-time {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          select {
            min-width: toRem(200);
            font-size: 1rem;
            font-family: inherit;
          }
        }
        &-address,
        &-comment {
          input {
            width: clamp(toRem(200), toRem(400), calc(100% - 1rem));
          }
        }
        &-pay {
          h3 {
            font-family: $font-body;
          }
          label:not(:last-child) {
            margin-right: 1.5rem;
          }
        }
      }
    }
    .cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1rem;
      &__link {
        margin: 0 1rem;
        text-align: center;
        line-height: 1.5;
      }
    }
  }
</style>
