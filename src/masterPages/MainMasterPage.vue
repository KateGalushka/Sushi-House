<template>
	<header>
		<nav-bar/>
		<vertical-menu/>
	</header>
	<main>
		<slot></slot>

	</main>
	<footer>
		<footer-component/>
	</footer>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import VerticalMenu from '@/components/VerticalMenu.vue';
import FooterComponent from '@/components/FooterComponent.vue';

</script>

<style lang="scss" scoped>

</style>