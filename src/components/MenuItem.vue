<template>
	<div class="card">
		<div class="card__img">
			<img v-if="getImagePath(dish.img_name)" :src="getImagePath(dish.img_name)" width="200">
			<!-- <img v-if="dishUrl" :src="dishUrl" :alt="dish.title" width="200"> -->
			<img v-else :src='dummyImagePath' :alt="dish.title" width="200">
		</div>
	
		<h3 class="card__title">{{ dish.title }}</h3>
	
		<div class="card__descr">
			<p>{{ dish.description }}</p>
			<p>{{ dish.weight }}г</p>
		</div>
		<div class="card__price">{{ dish.price }} грн.</div>
		<div class="card__buy">
			<div class="product-quantity">
				<button class="product-quantity__btn minus" :disabled="!inputPositive" @click="decreaseQuantity">
					<font-awesome-icon :icon="['fas', 'minus']" />
				</button>
				<input class="product-quantity__input" v-model="product.quantity" type="number" min="1" step="1" readonly>
				<button class="product-quantity__btn plus" @click="increaseQuantity">
					<font-awesome-icon :icon="['fas', 'plus']" />
				</button>
			</div>

			<button class="button">В кошик</button>
		</div>

	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
// import { storeToRefs } from 'pinia';
import { useStorageStore } from '@/stores/storage';

const storage = useStorageStore();

const props = defineProps({
	dish: {
		type: Object,
		required: true
	}
}) 

const dishUrl = computed(() => {
	return storage.getImagesPaths.find(path => path.includes(props.dish.img_name));
});

const dummyImagePath = new URL('../assets/images/sushi-illustration.png', import.meta.url).href;

const getImagePath = (imgPath) => new URL(`../assets/images/sushi/${imgPath}`, import.meta.url).href;

const product = ref({
	quantity: 1
});
function decreaseQuantity() {
	product.value.quantity--;
}
function increaseQuantity() {
	product.value.quantity++;
	console.log(product.value.quantity)
}
const inputPositive = computed(()=> product.value.quantity >=1);
</script>

<style lang="scss" scoped>
.card {
	width: 300px;
	// border: 1px solid red;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap:.75rem;
	text-align: center;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	&__img {
		width: calc(300px - 2rem);
		overflow: hidden;
		img {
			width: 100%;
			object-fit: cover;
			aspect-ratio: 1/1;
			transition: all .5s ease;
		}
	}
	&:hover {
		.card__img {
			img {
			transform: scale(1.1);
			}
		}
	}
	&__title {
		font-size: 1.75rem;
		font-weight: 600;
		color: $color2;
	}
	&__descr {
		line-height: 125%;
	}
	&__price {
		font-size: 1.5rem;
		font-weight: 600;
	}

}
.card__buy {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 1em;
	gap: 1rem;
	
}
.product-quantity {
	// display: grid;
	// place-items: center;
	// grid-template-columns: repeat(3, 1fr);
	// border: .25px solid $text-color;
	background-color: $color2-hover;

}
.product-quantity__btn {
	width: 40px;
	height: 40px;
	background-color: $bg-color1;
	&[disabled] {
		color: rgba(79, 68, 62, .3);
	}
	&.minus {
		border-right: .5px solid $text-color;
	}
	&.plus {
		border-left: .5px solid $text-color;
	}
}
.product-quantity__input {
	width: 45px;
	background-color: inherit;
	text-align: center;
	 &::-webkit-inner-spin-button, 
	 &::-webkit-outer-spin-button {
		-webkit-appearance: none;
	 }
}

</style>