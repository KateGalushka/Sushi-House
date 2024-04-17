<template>
  <header>
    <nav-bar />
    <vertical-menu />
  </header>
  <main>
    <slot></slot>
    <sidebar-cart :cart-items-count="cartItemsCount"/>
  </main>
  <footer>
    <footer-component />
  </footer>
</template>

<script setup>
  import NavBar from '@/components/NavBar.vue';
  import VerticalMenu from '@/components/VerticalMenu.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import SidebarCart from '@/components/SidebarCart.vue';
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useCartStore } from '@/stores/cart';
  const cart_store = useCartStore();
  const { cartItemsCount } = storeToRefs(cart_store);

  import { useDishesStore } from '@/stores/dishes';
  const dishes_store = useDishesStore();
  const { dishesList } = storeToRefs(dishes_store);

  onMounted(async()=> {
	await dishes_store.setDishesList(); //set data from json-file
	
		//get images from storage
    let namesArr = [];
    dishesList.value.map((dish) => namesArr.push(dish.img_name));
    const imagesNamesArray = Array.from(new Set(namesArr));
   //  console.log('imagesNamesArray: ', imagesNamesArray)
   //  await imagesNamesArray.forEach((imageName)=> storage.setImagePath(imageName));

	if (localStorage.getItem('cart')) {
		cart_store.userCart = JSON.parse(localStorage.getItem('cart'));
	} 
  })

</script>

<style lang="scss" scoped></style>
