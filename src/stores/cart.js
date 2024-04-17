import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useDishesStore } from "./dishes";
import { toast } from "vue3-toastify";

export const useCartStore = defineStore('cart', () => {

	const userCart = ref([]);
	
	const cartItemsCount = computed(() => {
		if (userCart.value.length === 0) {
			return 0;
		} else {
			return userCart.value.reduce((prev, curr) => prev + curr.quantity, 0);
			}
	});
		
	const isItemInCart = computed(() => {
		return (itemId) => userCart.value.find(item => item.id === itemId);
	});
	
	const cartTotalSum = computed(() => {
		const dish_store = useDishesStore();
		return userCart.value.reduce((total, current) => total + dish_store.getDishById(current.id).price * current.quantity, 0);
	})

	const saveCartToLocalStorage = () => {
		localStorage.setItem('cart', JSON.stringify(userCart.value));
	}
	const notify = (type, message) => {
		if (type === 'success') {
			toast.success(message, {
				position: toast.POSITION.TOP_CENTER,
			});
		}
		if (type === 'warning') {
			toast.warning(message,  {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	}

	function addItemToCart(dishId){
		let index = this.userCart.findIndex(item => item.id === dishId);
		if (index !== -1) {
			this.userCart[index].quantity += 1;
			saveCartToLocalStorage();
			notify('success', 'Товар додано у кошик!');
			
		} else {
			this.userCart.push({
				id: dishId,
				quantity: 1
			})
			saveCartToLocalStorage();
			notify('success', 'Товар додано у кошик!');
		}
		console.log('cart: ', this.userCart);
	}
	
	
	function decreaseQuantity(dishId) {
		let index = this.userCart.findIndex(item => item.id === dishId);
		if (index !== -1) {
			this.userCart[index].quantity -=1;
			saveCartToLocalStorage();
			notify('warning', 'Кількість зменшено!');
			if (this.userCart[index].quantity === 0) {
				// this.userCart = this.userCart.filter(item => item.id !== dishId)
				this.deleteItemFromCart(dishId);
				saveCartToLocalStorage();
				notify('warning', 'Товар видалено з кошика!');
			}
		}
   };

  	function increaseQuantity(dishId) {
		let index = this.userCart.findIndex(item => item.id === dishId);
		if (index !== -1) {
			this.userCart[index].quantity +=1;
			saveCartToLocalStorage();
			notify('success', 'Кількість збільшено!')
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
		this.userCart = this.userCart.filter(item => item.id !== dishId);
		saveCartToLocalStorage();
		notify('warning', 'Товар видалено з кошика!');
		if (this.userCart.length === 0) {
			localStorage.removeItem('cart');
		}
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