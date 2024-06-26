import { defineStore } from 'pinia';
import { dishes } from '../stores/data/sushi-data';
import { ref, computed } from 'vue';

export const useDishesStore = defineStore('dishes', () => {

	const dishesList = ref([]);

	const setDishesList = () => {
		dishesList.value = dishes;
	};

	const getDishById = computed(() => {
		return (id) => dishesList.value.find(dish => dish.id ===id)
	});

	const categoryFilter = ref(null);
	
	const dishesFilteredByCategory = computed(() => {
		const filter = categoryFilter.value;
		if (filter) {
			return dishesList.value.filter(dish => dish.category.toLowerCase() == categoryFilter.value.toLowerCase());
		} else {
			return dishesList.value;
		}
	});
	
   return {
		dishesList,
		setDishesList,
		getDishById,
		categoryFilter,
		dishesFilteredByCategory,
		
	}

})