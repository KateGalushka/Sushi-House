<template>
   <main-master-page>
      <section class="hero">
         <div class="wrapper hero__container">
            <div class="hero__content">
               <transition
                  name="title"
                  appear
               >
                  <h1>Найсмачніші суші у твоєму місті</h1>
               </transition>
               <p>Замовляйте улюблені страви онлайн</p>
               <div class="hero__btns">
                  <button
                     class="button"
                     @click="scrollToOrderRules"
                  >
                     Як замовити?
                  </button>
                  <RouterLink
                     class="button"
                     :to="{ name: 'menu' }"
                     >Перейти до меню</RouterLink
                  >
               </div>
            </div>
         </div>
         <picture class="hero__img">
            <source
               media="(max-width: 768px)"
               srcset="@/assets/images/home-mobile2.webp"
            />
            <source srcset="@/assets/images/home2.webp" />
            <img
               src="@/assets/images/home2.webp"
               alt="sushi"
            />
         </picture>
      </section>

      <section
         class="wrapper rules"
         ref="orderRulesSection"
         id="orderRulesSection"
      >
         <order-rules />
      </section>
      <section
         class="wrapper about"
         ref="aboutSection"
         id="aboutSection"
      >
         <about-section />
      </section>
      <section class="wrapper map">
         <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2575.299710736952!2d30.119115376820513!3d49.7992328340382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d342182b0a3fb7%3A0x71c87108a58bd62b!2z0LLRg9C70LjRhtGPINCv0YDQvtGB0LvQsNCy0LAg0JzRg9C00YDQvtCz0L4sINCR0ZbQu9CwINCm0LXRgNC60LLQsCwg0JrQuNGX0LLRgdGM0LrQsCDQvtCx0LsuLCAwOTEwMA!5e0!3m2!1suk!2sua!4v1706791288420!5m2!1suk!2sua"
            width="1280"
            height="400"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
         ></iframe>
      </section>
   </main-master-page>
</template>
<script setup>
   import MainMasterPage from '@/masterPages/MainMasterPage.vue';
   import OrderRules from '@/components/OrderRules.vue';
   import AboutSection from '@/components/AboutSection.vue';

   import { ref } from 'vue';

   const orderRulesSection = ref(null);

   const scrollToOrderRules = () => {
      if (orderRulesSection.value) {
         orderRulesSection.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   };
</script>

<style lang="scss" scoped>
   .hero {
      display: flex;
      align-items: center;
      padding: 0.5rem 0 0.5rem 2rem;
      overflow: clip;

      &__container {
         flex: 1;
         display: flex;
         align-items: center;
         gap: 0.5rem;
      }
      &__img {
         flex: 1;
         img {
            object-fit: cover;
            width: 100%;
         }
      }
      &__content {
         max-width: toRem(600);
         display: flex;
         flex-direction: column;
         gap: 1em;
         margin-inline: auto;
         margin-top: clamp(5rem, 12.5vw, 10rem);
         margin-bottom: clamp(1rem, 22.5vw + -8rem, 10rem);
         padding-left: 1.5rem;

         h1 {
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: clamp(1.75rem, 1rem + 3.75vw, 4rem);
            font-weight: 700;
            line-height: 1.15;
				text-shadow: 3px 4px 7px $color-btn;
            // text-align: center;
         }
         p {
            font-size: 1rem;
            padding: 0.5rem 0;
         }
      }
      &__btns {
         display: flex;
         flex-wrap: wrap;
         gap: 0.75em;
      }

      @media (max-width: toRem(768)) {
         flex-direction: column;
         justify-content: center;
         padding: 1rem;
         &__content {
            text-align: center;
            padding: 0;
            padding-bottom: 2rem;
         }
         &__btns {
            margin-inline: auto;
            justify-content: center;
         }
         &__img {
            // border: 1px solid $bg-color1;
            border-radius: 0.5rem;
            width: 100%;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            img {
               border-radius: 0.5rem;
            }
         }
      }
   }
   .map {
      iframe {
         max-width: 100%;
         width: 100%;
         margin: 0 auto;
      }
   }

   .title-enter-from,
   .title-leave-to {
      transform: translateY(-60px);
      opacity: 0;
   }

   .title-enter-active,
   .title-leave-active {
      transition: all 0.5s ease;
   }

   .title-enter-to,
   .title-leave-from {
      opacity: 1;
      transform: translateY(0);
   }
</style>
