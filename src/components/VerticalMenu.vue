<template>
	<div class="side-menu">
		<ul>
			<li class="side-menu__item">
				<a href="#">
					<img src="@/assets/images/logo/logo-sushi.svg" width="30" height="30" alt="logo-sushi">
					<span>Суші і роли</span>
				</a>
			</li>
			<li class="side-menu__item">
				<a href="#">
					<img src="@/assets/images/logo/logo-set.svg" width="30" height="30" alt="logo-sushi">
					<span>Набори і сети</span>
				</a>
			</li>
			<li class="side-menu__item">
				<a href="#">
					<img src="@/assets/images/logo/logo-hot dishes.svg" width="30" height="30" alt="logo-hot dishes">
					<span>Гарячі страви</span>
				</a>
			</li>
			<li class="side-menu__item">
				<a href="#">
					<img src="@/assets/images/logo/logo-salads.svg" width="30" height="30" alt="logo-salads">
					<span>Салати</span>
				</a>
			</li>
			<li class="side-menu__item">
				<a href="#">
					<img src="@/assets/images/logo/logo-pizza.svg" width="30" height="30" alt="logo-pizza">
					<span>Піца</span>
				</a>
			</li>
			<li class="side-menu__item">
				<a href="#">
					<img src="@/assets/images/logo/logo-drinks.svg" width="30" height="30" alt="logo-drinks">
					<span>Напої</span>
				</a>
			</li>
		</ul>

	</div>
</template>

<script setup>
// import { ref } from 'vue';


</script>

<style lang="scss" scoped>

.side-menu {
	width: 70px;
	// height: calc(100% - 85px);
	height: 50%;
	background-color: $bg-color1;
	position: fixed;
	left: 0;
	top: clamp(3.625rem, 3.338rem + 1.438vi, 5.063rem);
	padding-top: 1rem;
	overflow: hidden;
	transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
	ul {
		height: 100%;
		display: flex;
		flex-direction: column;
		// justify-content: start;
		gap: .5rem;
		// overflow-x: hidden;
		}
	&:hover {
		width: 200px;
	}
	@media (max-width: 1390px) {
		// position: relative;
		// top: 58px;
		max-width: 100%;
		width: 100%;
		height: 60px;
		padding: 0 1.5rem;
		ul {
			flex-direction: row;
			flex-wrap: nowrap;
			overflow-x: auto;
			overflow-y: hidden;
			white-space: nowrap;
			-webkit-overflow-scrolling: touch;
			&::-webkit-scrollbar {
				display: none;
			}
		}
		&:hover {
			width: 100%;
		}
	
}
}
.side-menu__item { 
	padding: 0.5rem 1rem;
	border-bottom: 1px solid $text-color;
	flex-shrink: 1;
	transition: all .3s cubic-bezier(0.075, 0.82, 0.165, 1);
	a {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}
	img {
		width: 40px;
		height: 40px;
	}
	span {
		// opacity: 0;
		white-space: nowrap;
	}
	&:hover, &:focus {
		background-color: $color-btn;
	}
	@media (max-width: 1390px) {
		flex: 1 1 200px;
		border-bottom: none;
		&:not(:last-of-type) {
			border-right: 1px solid $text-color;
		}
		
	}
}
@media (max-width: 1390px) {

}

</style>