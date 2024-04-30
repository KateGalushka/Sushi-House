<template>
   <div>
      <nav-bar />
      <div class="wrapper notFound>">
         <div class="notFound__container">
            <div class="notFound__4">4</div>
            <div class="notFound__img">
               <img
                  src="@/assets/images/logo/circle.webp"
                  alt="Image"
               />
            </div>
            <div class="notFound__4">4</div>
         </div>
         <div class="notFound__text">
            <p class="notFound__text-oops">От халепа...</p>
            <p class="notFound__text-text">
               <b>Сторінку не знайдено!</b>
            </p>
            <p class="notFound__text-text">
               Неправильно набрано адресу або такої сторінки на сайті більше не існує.
            </p>
         </div>
         <div class="notFound__button-back">
            <RouterLink
               :to="{ name: 'home' }"
               class="button"
            >
               Назад на головну
            </RouterLink>
         </div>
      </div>
   </div>
</template>

<script setup>
   import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss" scoped>
   .notFound {
      &__container {
         margin: toRem(200) auto 2em;
         max-width: toRem(350);
         display: flex;
         align-items: center;
         justify-content: space-around;
         gap: 0.75rem;
      }
      &__4 {
         font-size: clamp(6.5rem, -1.1111rem + 35.5556vw, 10rem);
         font-family: $font-title1;
         font-weight: 600;
      }
      &__img {
         max-width: toRem(125);
         outline: 0.25rem solid $text-color;
         outline-offset: 3px;
         border-radius: 50%;
         img {
            width: 100%;
            animation: rotateCircle 3s linear infinite;
         }
      }
      &__text {
         text-align: center;
         max-width: toRem(650);
         margin: 1rem auto;
         line-height: 1.5;
         &-oops {
            font-size: clamp(1.875rem, 1.65rem + 1.125vw, 3rem);
            font-weight: 600;
            font-family: $font-title1;
            padding: 1rem;
            color: $color2;
            border-top: 1px solid $text-color;
         }
         &-text {
            font-size: clamp(1.25rem, 1.2rem + 0.25vw, 1.5rem);
            &:not(:last-child) {
               padding-bottom: 1rem;
            }
         }
      }
      &__button-back {
         text-align: center;
         margin: 2em auto;
         a {
            display: inline-block;
         }
      }
   }
   @keyframes rotateCircle {
      0% {
         transform: rotate(0);
      }
      17% {
         transform: rotate(60deg);
      }
      33% {
         transform: rotate(120deg);
      }
      50% {
         transform: rotate(180deg);
      }
      67% {
         transform: rotate(240deg);
      }
      83% {
         transform: rotate(300deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
</style>
