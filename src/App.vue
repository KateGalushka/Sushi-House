<script setup>
   import { ref } from 'vue';
   import { RouterView } from 'vue-router';
   import { useRouter } from 'vue-router';
   const router = useRouter();
   const transitionKey = ref(router.path);

</script>

<template>
   <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
         <component
            :is="Component"
            :key="transitionKey"
         />
      </transition>
   </router-view>
</template>

<style lang="scss">
   .fade-enter-from,
   .fade-leave-to {
      opacity: 0;
   }

   .fade-enter-active,
   .fade-leave-active {
      transition: all 0.3s ease;
   }

   .fade-enter-to,
   .fade-leave-from {
      opacity: 1;
   }
</style>
