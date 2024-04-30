<template>
   <div
      v-if="authedUser"
      class="user-profile"
   >
      <img
         v-if="imgSrc"
         :src="imgSrc"
      />
      <font-awesome-icon
         v-else
         :icon="['far', 'circle-user']"
         size="2xl"
         style="color: #ee6237"
      />
      <span>{{ authedUser.displayName ?? authedUser.email }}</span>
      <button
         class="login-btn"
         @click="onLogout"
      >
         <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
      </button>
   </div>
   <div v-else>
      <button
         class="login-btn"
         @click="onLogin"
      >
         <font-awesome-icon :icon="['far', 'user']" />
         &nbsp;<span>Вхід</span>
      </button>
   </div>
</template>

<script setup>
   import { computed } from 'vue';
   import { storeToRefs } from 'pinia';

   import { useAuthStore } from '@/stores/auth';
   const auth_store = useAuthStore();
   const { authedUser } = storeToRefs(auth_store);

   const imgSrc = computed(() => {
      // console.log('photo: ', user.value.photoURL);
      return authedUser.value.photoURL;
   });

   import { useRouter } from 'vue-router';
   const router = useRouter();

   function onLogin() {
      router.push({
         name: 'login'
      });
   }

   function onLogout() {
      auth_store.logOut();
      router.go();
      router.push({
         name: 'home'
      });
   }
</script>

<style lang="scss" scoped>
   .user-profile {
      display: flex;
      // flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
      img {
         border-radius: 50%;
         width: 2.25rem;
      }
   }
   .login-btn {
      padding: 0.25rem 0.5rem;
      border: 1px solid $text-color;
      border-radius: 5px;
      &:hover,
      &:focus {
         color: $color2;
         border-color: $color2;
      }
   }

   @media (max-width: toRem(768)) {
      .user-profile,
      .login-btn {
         font-size: 1rem;
      }
   }
</style>
