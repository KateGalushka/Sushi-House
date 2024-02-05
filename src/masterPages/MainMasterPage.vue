<template>
	<header>
		<nav-bar/>
		<vertical-menu/>
	</header>
	<main>
		<slot></slot>
		<cart-button :cartItemsCount="0"/>

	</main>
	<footer>
		<footer-component/>
	</footer>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import VerticalMenu from '@/components/VerticalMenu.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import CartButton from '@/components/CartButton.vue';

</script>

<style lang="scss" scoped>

</style>