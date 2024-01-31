<template>
	<main-master-page>
		<div class="wrapper">
			<h1 class="menu__title">Меню</h1>
			<section class="menu__categories">
				<div class="menu__category">
					<h3>Роли</h3>
					<div class="menu__category-img">
						<img src="@/assets/images/categories/menu-1.jpg">
					</div>
				</div>
				<div class="menu__category">
					<h3>Набори і сети</h3>
					<div class="menu__category-img">
						<img src="@/assets/images/categories/menu-2.jpg">
					</div>
				</div>
				<div class="menu__category">
					<h3>Салати</h3>
					<div class="menu__category-img">
						<img src="@/assets/images/categories/menu-3.jpg">
					</div>
				</div>
				<div class="menu__category">
					<h3>Гарячі страви</h3>
					<div class="menu__category-img">
						<img src="@/assets/images/categories/menu-4.jpg">
					</div>
				</div>
				<div class="menu__category">
					<h3>Піца</h3>
					<div class="menu__category-img">
						<img src="@/assets/images/categories/menu-5.jpg">
					</div>
				</div>
				<div class="menu__category">
					<h3>Напої</h3>
					<div class="menu__category-img">
						<img src="@/assets/images/categories/menu-6.jpg">
					</div>
				</div>

			</section>
			<div class="menu-container">
				<menu-item v-for="dish in dishesList" :key="dish.id" :dish="dish"/>
			</div>
			
		</div>

	</main-master-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { dishes } from '../stores/data/sushi-data'
import MenuItem from '@/components/MenuItem.vue';
import MainMasterPage from '@/masterPages/MainMasterPage.vue';
import { useStorageStore } from '@/stores/storage';

const storage = useStorageStore();

const dishesList = ref([]);

onMounted(async() => {
	dishesList.value = dishes;
	let namesArr = [];
	dishesList.value.map((dish => namesArr.push(dish.img_name)));
	const imagesNamesArray = Array.from(new Set(namesArr));
	console.log('imagesNamesArray: ', imagesNamesArray)
	// await imagesNamesArray.forEach((imageName)=> storage.setImagePath(imageName));

})

</script>

<style lang="scss" scoped>
.menu__title {
	margin: 3em 0 .5em;
	font-size: clamp(1.125rem, 0.5rem + 3.125vw, 3rem);
	font-weight: 600;
}

.menu__categories {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	margin-bottom: 3em;
}
.menu__category {
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: clamp(17.5rem, 15.521rem + 9.896vw, 23.438rem);
	gap: .5rem;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 5px;
	h3 {
		font-size: 2rem;
		text-align: center;
		// z-index: 3;
		// position: absolute;
		height: 50px;
		// width: 400px;
		// background-color: transparent;
		background-color: #fff;
		transition: all .3s ease-in;
	}
	&-img {
		background-color: #d4d4d4;
		img {
			max-width: 100%;
			// width: 100%;
			object-fit: cover;
			aspect-ratio: 5/4;
		}
	}
	&:hover {
		h3 {
			transform: translateY(30px);
			// height: 80px;
		}
		
	}
}
.menu-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5rem 1.25rem;
}

</style>