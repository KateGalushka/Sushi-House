import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useDishesStore } from "./dishes";

export const useCartStore = defineStore('cart', () => {

	const userCart = ref([]);
	
	const cartItemsCount = computed(() => {
		if (userCart.value.length === 0) {
			return 0;
		} else {
			return userCart.value.reduce((prev, curr, index) => prev + curr.quantity, 0);
			}
	});
		
	const isItemInCart = computed(() => {
		return (itemId) => userCart.value.find(item => item.id === itemId)
	});
	
	const cartTotalSum = computed(() => {
		const dish_store = useDishesStore();
		return userCart.value.reduce((total, current) => total + dish_store.getDishById(current.id).price * current.quantity, 0)
	})

	function addItemToCart(dishId){
		let index = this.userCart.findIndex(item => item.id === dishId);
		if (index !== -1) {
			this.userCart[index].quantity += 1;
		} else {
			this.userCart.push({
				id: dishId,
				quantity: 1
			})
		}
		console.log('cart: ', this.userCart);
	}
	
	
	function decreaseQuantity(dishId) {
		let index = this.userCart.findIndex(item => item.id === dishId);
		if (index !== -1) {
			this.userCart[index].quantity -=1;
			if (this.userCart[index].quantity === 0) {
				// this.userCart = this.userCart.filter(item => item.id !== dishId)
				this.deleteItemFromCart(dishId);
			}
		}
   };

  	function increaseQuantity(dishId) {
		let index = this.userCart.findIndex(item => item.id === dishId);
		if (index !== -1) {
			this.userCart[index].quantity +=1;
		}
   };

	const inputPositive = computed(() => {
		return (dishId) => {
			let index = userCart.value.findIndex(item => item.id === dishId);
			if (index !==-1) {
				return userCart.value[index].quantity >= 1;
			}
		}
	});

	function deleteItemFromCart(dishId){
		this.userCart = this.userCart.filter(item => item.id !== dishId)
	}


	return {
		userCart,
		cartItemsCount,
		isItemInCart,
		cartTotalSum,
		
		addItemToCart,
		deleteItemFromCart,
		decreaseQuantity,
		increaseQuantity,
		inputPositive
		
	}


})