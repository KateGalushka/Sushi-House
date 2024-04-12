<template>
  <div class="wrapper">
    <h1 class="menu__title">Меню</h1>
    <section class="menu__categories">
      <div
        class="category"
        @click="goToCategory('rolls')"
      >
        <h3>Роли</h3>
        <div class="category__img">
          <img src="@/assets/images/categories/menu-1.jpg" />
        </div>
      </div>
      <div
        class="category"
        @click="goToCategory('sets')"
      >
        <h3>Набори і сети</h3>
        <div class="category__img">
          <img src="@/assets/images/categories/menu-2.jpg" />
        </div>
      </div>
      <div
        class="category"
        @click="goToCategory('salads')"
      >
        <h3>Салати</h3>
        <div class="category__img">
          <img src="@/assets/images/categories/menu-3.jpg" />
        </div>
      </div>
      <div
        class="category"
        @click="goToCategory('hots')"
      >
        <h3>Гарячі страви</h3>
        <div class="category__img">
          <img src="@/assets/images/categories/menu-4.jpg" />
        </div>
      </div>
      <div
        class="category"
        @click="goToCategory('pizza')"
      >
        <h3>Піца</h3>
        <div class="category__img">
          <img src="@/assets/images/categories/menu-5.jpg" />
        </div>
      </div>
      <div
        class="category"
        @click="goToCategory('drinks')"
      >
        <h3>Напої</h3>
        <div class="category__img">
          <img src="@/assets/images/categories/menu-6.jpg" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function goToCategory(categoryName) {
    router.push({
      name: 'category',
      params: {
        categoryTitle: categoryName
      }
    })
  }
</script>

<style lang="scss" scoped>
  .menu__title {
    margin: 150px 0 0.5em;
    font-size: clamp(1.25rem, 0.5rem + 3.125vw, 3rem);
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
  .category {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: clamp(17.5rem, 15.521rem + 9.896vw, 23.438rem);
    gap: 0.5rem;
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
      transition: all 0.3s ease-in;
    }
    &__img {
      background-color: #d4d4d4;
      img {
        // max-width: 100%;
        width: 100%;
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
</style>
