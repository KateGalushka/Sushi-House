<template>
  <main-master-page>
    <div class="wrapper">
      <h2 class="menu__title">
        Меню - <span>{{ listTitle }}</span>
      </h2>
      <router-link
        class="menu__link"
        :to="{ name: 'menu' }"
      >
        <font-awesome-icon :icon="['fas', 'left-long']" /> &nbsp; Назад до категорій
      </router-link>
		
      <div class="menu__container">
        <menu-item
          v-for="dish in dishesFilteredByCategory"
          :key="dish.id"
          :dish="dish"
        />
      </div>
    </div>
  </main-master-page>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import MenuItem from '@/components/MenuItem.vue';
  import MainMasterPage from '@/masterPages/MainMasterPage.vue';

  import { useStorageStore } from '@/stores/storage';
  const storage = useStorageStore();

  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();

  import { useDishesStore } from '@/stores/dishes';
  const dishesStore = useDishesStore();
  const { dishesList, categoryFilter, dishesFilteredByCategory } = storeToRefs(dishesStore);

  const props = defineProps({
    categoryTitle: {
      type: String,
      required: true
    }
  });

  const listTitle = ref('');

  onMounted(async () => {
    await dishesStore.setDishesList(); //set data from json-file
    categoryFilter.value = props.categoryTitle;
   //  console.log('filteredDishes: ', dishesFilteredByCategory.value)

    //get images from storage
    let namesArr = [];
    dishesList.value.map((dish) => namesArr.push(dish.img_name));
    const imagesNamesArray = Array.from(new Set(namesArr));
   //  console.log('imagesNamesArray: ', imagesNamesArray)
   //  await imagesNamesArray.forEach((imageName)=> storage.setImagePath(imageName));
    listTitle.value = dishesFilteredByCategory.value[0]['categoryUA'];
  })

  watch(
    () => route.params.categoryTitle,
    (newCategory) => {
      categoryFilter.value = newCategory;
      listTitle.value = dishesFilteredByCategory.value[0]['categoryUA'];
    }
  )
</script>

<style lang="scss" scoped>
  .menu__title {
    margin: 150px 0 0.5em;
    font-size: clamp(1.5rem, 0.667rem + 2.917vw, 3rem);
    font-weight: 600;
    span {
      font-size: clamp(1.25rem, 0.667rem + 2.292vw, 2.5rem);
    }
  }
  .menu__link {
    display: block;
    font-weight: 600;
    margin-bottom: 1.5em;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $text-color;
    &:hover {
      color: $color2;
    }
  }
  .menu__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(toRem(300), 1fr));
    gap: 1.5rem 1.25rem;
    justify-items: center;
  }
</style>
