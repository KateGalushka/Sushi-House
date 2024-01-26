<script setup>
import { RouterView } from 'vue-router'
</script>

<template>

    <div class="container">
		 <RouterView />
           
    </div>
 
</template>

<style lang="scss">
.container {
	max-width: 100vw;
	margin: 0 auto;
}


/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */



</style>
