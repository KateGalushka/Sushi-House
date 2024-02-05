<template>
	<button class="cart__button">
		<font-awesome-icon :icon="['fas', 'basket-shopping']" size="2xl"/>
		<span class="cart__button-badge">{{ cartItemsCount }}</span>
	</button>
</template>

<script setup>
const props = defineProps({
	cartItemsCount: Number,
	default: 0
	}
)

</script>

<style lang="scss" scoped>
.cart__button {
	position: fixed;
	bottom: 10%;
	right: 5%;
	border: 3px solid $color2;
	border-radius: 25%;
	padding: .75rem;
	background-color: $bg-color1;
	box-shadow: 5px 5px 2px rgba(0,0,0,0.03), 0 4px 10px rgba(0,0,0,0.17);
	&:hover, &:focus {
		background-color: $color-btn;
	}
	&-badge {
		position: absolute;
		display: grid;
		place-items: center;
		min-width: 30px;
		min-height: 30px;
		top:-20%;
		right: -15%;
		border: 3px solid $text-color;
		border-radius: 35%;
		background-color: $text-color;
		color: #fff;
		padding: 2px;
		z-index: 5;
	}
}

</style>