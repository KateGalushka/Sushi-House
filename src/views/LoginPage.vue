<template>
   <div class="wrapper">
      <router-link
         :to="{ name: 'home' }"
         class="back"
      >
         <font-awesome-icon :icon="['fas', 'left-long']" /> &nbsp; Назад на головну
      </router-link>

      <div class="login login__container">
         <div class="login__title">
            <img
               class="logo"
               src="@/assets/images/logo-SH.png"
               width="100"
            />
            <h1>Вхід/реєстрація</h1>
         </div>
         <div class="login__content">
            <div class="login__content-form sign-in">
               <form>
                  <fieldset>
                     <legend>Вхід</legend>
                     <label for="emailForLogin">Введіть адресу електронної пошти</label>
                     <input
                        type="email"
                        id="emailForLogin"
                        name="emailForLogin"
                        required
                        v-model="emailForLogin"
                     />
                     <label for="passwordForLogin">Пароль</label>
                     <input
                        type="password"
                        minlength="6"
                        required
                        id="passwordForLogin"
                        name="passwordForLogin"
                        v-model="passwordForLogin"
                        @focus="showRemark = true"
                     />
                     <p
                        v-if="showRemark"
                        class="password-remark"
                     >
                        Пароль повинен містити мінімум 6 знаків
                     </p>
                     <button
                        type="submit"
                        class="button login-button"
                        :disabled="!isDataValidForLogin"
                        @click.prevent="loginWithEmailAndPassword(emailForLogin, passwordForLogin)"
                     >
                        Увійти
                     </button>
                  </fieldset>
               </form>
            </div>
            <div class="login__content-checkbox">
               <input
                  type="checkbox"
                  name="register"
                  id="register"
                  v-model="wantToSignUp"
               />
               <label for="register">Хочу зареєструватися</label>
            </div>

            <div class="login__content-form sign-up">
               <form v-if="wantToSignUp">
                  <fieldset>
                     <legend>Реєстрація</legend>
                     <label for="email">Введіть адресу електронної пошти</label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        v-model="email"
                     />
                     <label for="password">Пароль</label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        minlength="6"
                        v-model="password"
                        @focus="showRemark = true"
                     />
                     <p
                        v-if="showRemark"
                        class="password-remark"
                     >
                        Пароль повинен містити мінімум 6 знаків
                     </p>
                     <label for="userName">Введіть ім'я</label>
                     <input
                        type="text"
                        id="userName"
                        name="userName"
                        v-model="userName"
                     />
                     <label for="userPhone">Введіть свій контактний телефон</label>
                     <input
                        type="tel"
                        placeholder="(XXX)-XXX-XX-XX"
                        maxlength="15"
                        id="userPhone"
                        name="userPhone"
                        v-model="userPhone"
                     />
                     <button
                        type="submit"
                        class="button login-button"
                        :disabled="!isDataValidForSignUp"
                        @click.prevent="registerWithEmailAndPassword(email, password)"
                     >
                        Зареєструватись
                     </button>
                  </fieldset>
               </form>
            </div>
         </div>
         <div class="login__google">
            <p>або</p>
            <button
               class="button"
               @click="loginWithGoogle"
            >
               <img
                  src="@/assets/images/google-logo.svg"
                  class="google-logo"
               />
               <span>Вхід</span>
            </button>
         </div>
      </div>
   </div>
</template>

<script setup>
   import { ref, computed, watch, onMounted } from 'vue';
   import { useAuthStore } from '@/stores/auth';
   const authStore = useAuthStore();

   const {
      signUpWithWithEmailAndPassword,
      signInWithWithEmailAndPassword,
      loginWithGoogleAccount
   } = authStore;

   import { useRouter } from 'vue-router';
   const router = useRouter();

   const emailForLogin = ref(null);
   const passwordForLogin = ref(null);

   const wantToSignUp = ref(false);

   const email = ref(null);
   const password = ref(null);
   const showRemark = ref(false);
   const userName = ref('');
   const userPhone = ref('');

   const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const phoneRegExp = /^\(0\d{2}\)[ -]?\d{3}[ -]?\d{2}[- ]?\d{2}$/;
   const isPhoneNumberValid = computed(() => {
      return phoneRegExp.test(userPhone.value);
   });

   watch(userPhone, (newVal, oldVal) => {
      if (newVal.length > oldVal.length) {
         userPhone.value = newVal
            .replace(/\D/g, '')
            .replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/g, `($1) $2-$3-$4`);
      }
   });

   const isDataValidForLogin = computed(() => {
      return emailRegExp.test(emailForLogin.value) && passwordForLogin.value?.length >= 6;
   });
   const isDataValidForSignUp = computed(() => {
      return (
         emailRegExp.test(email.value) &&
         password.value?.length >= 6 &&
         userName.value &&
         isPhoneNumberValid.value
      );
   });

   async function registerWithEmailAndPassword(email, password) {
      const user = {
         name: userName.value,
         phone: userPhone.value
      };
      let res = await signUpWithWithEmailAndPassword(email, password, user);
      if (res) {
         router.push({
            name: 'home'
         });
      }
   }

   async function loginWithEmailAndPassword(email, password) {
      let res = await signInWithWithEmailAndPassword(email, password);
      console.log('in login page: ', res);
      if (res) {
         router.push({
            name: 'home'
         });
      }
   }

   async function loginWithGoogle() {
      let res = await loginWithGoogleAccount();
      if (res) {
         router.push({
            name: 'home'
         });
      }
   }
</script>

<style lang="scss" scoped>
   .back {
      font-weight: 600;
      &:hover {
         color: $color2;
      }
   }

   .login {
      &__container {
         margin: 5vh 5vw 10vh;
         padding: 5%;
         border: 1px solid $text-color;
      }
      &__title {
         display: flex;
         align-items: center;
         gap: 2rem;
         margin-bottom: 2em;
         .logo {
            width: clamp(3.125rem, 2.5rem + 3.125vw, 5rem);
         }
         h1 {
            font-size: clamp(1.125rem, 0.583rem + 2.708vw, 2.75rem);
            font-weight: 600;
            margin: 0 auto;
         }
      }
      &__content {
         margin-bottom: 1rem;
         &-form {
            max-width: clamp(toRem(300), toRem(650), 95%);
            margin-inline: auto;
            // flex: 1 0 45%;
            fieldset {
               border: 1px solid $text-color;
               padding: 1.5rem 2rem;
               box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
               &:hover,
               &:focus {
                  border: 2px solid $color2;
               }
               @media (max-width: toRem(475)) {
                  padding: 1rem;
               }
            }
            legend {
               font-weight: 600;
               font-size: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
               padding: 0.5rem 0.75rem;
            }
            label,
            input {
               display: block;
               margin-bottom: 0.75rem;
               min-width: 100%;
            }
            input {
               border: 1px solid $text-color;
               border-radius: 0.5rem;
               padding: 0.5rem;
            }
            .login-button {
               margin-top: 1.25rem;
            }
         }
         &-checkbox {
            padding: 1rem;
            margin: 0.5em auto;
            width: max-content;
            display: grid;
            grid-template-columns: 1em auto;
            gap: 1.25em;
            label {
               font-size: clamp(0.875rem, 0.8rem + 0.375vw, 1.25rem);
               font-weight: 600;
            }
            input[type='checkbox'] {
               -webkit-appearance: none;
               appearance: none;
               background-color: #fff;
               margin: 0;
               font: inherit;
               color: currentColor;
               width: 1.5em;
               height: 1.5em;
               border: 0.15em solid currentColor;
               border-radius: 0.15em;
               transform: translateY(-0.075em);
               display: grid;
               place-content: center;
               &::before {
                  content: url('../assets/images/logo/checkbox-checked.svg');
                  width: 0.65em;
                  height: 0.65em;
                  opacity: 0;
                  transform: translateY(-0.6em);
                  transition: all 0.2s ease-in-out;
               }
            }
            input[type='checkbox']:checked::before {
               opacity: 1;
            }
         }
      }

      &__google {
         text-align: center;
         p {
            margin-bottom: 1.5em;
         }
         .button {
            padding: 0.5em 1.75em;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 1em;
         }
         .google-logo {
            width: 35px;
         }
      }
      .password-remark {
         font-size: 0.75rem;
         padding-bottom: 1rem;
      }
   }
</style>
