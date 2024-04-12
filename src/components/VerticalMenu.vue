<template>
  <div class="side-menu">
    <!-- <ul>
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
					<img src="@/assets/images/logo/logo-salads.svg" width="30" height="30" alt="logo-salads">
					<span>Салати</span>
				</a>
			</li>
			<li class="side-menu__item">
				<a href="#">
					<img src="@/assets/images/logo/logo-hot-dishes.svg" width="30" height="30" alt="logo-hot dishes">
					<span>Гарячі страви</span>
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
		</ul> -->
    <ul class="side-menu__list">
      <li
        class="side-menu__item"
        v-for="link in links"
        :key="link.title"
        @click="goToCategory(link.path)"
      >
        <!-- <button @click="goToCategory(link.path)"> -->
        <img
          :src="getImagePath(link.img)"
          width="30"
          height="30"
          :alt="link.img"
        />
        <span>{{ link.title }}</span>
        <!-- </button> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { watch } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const links = [
    {
      path: 'rolls',
      img: 'logo-sushi.svg',
      title: 'Суші та роли'
    },
    {
      path: 'sets',
      img: 'logo-set.svg',
      title: 'Набори і сети'
    },
    {
      path: 'salads',
      img: 'logo-salads.svg',
      title: 'Салати'
    },
    {
      path: 'hots',
      img: 'logo-hot-dishes.svg',
      title: 'Гарячі страви'
    },
    {
      path: 'pizza',
      img: 'logo-pizza.svg',
      title: 'Піца'
    },
    {
      path: 'drinks',
      img: 'logo-drinks.svg',
      title: 'Напої'
    }
  ]
  const getImagePath = (imgPath) =>
    new URL(`../assets/images/logo/${imgPath}`, import.meta.url).href

  function goToCategory(category) {
    router.push({
      name: 'category',
      params: {
        categoryTitle: category
      }
    })
  }
</script>

<style lang="scss" scoped>
  .side-menu {
    width: toRem(70);
    // height: calc(100% - 85px);
    height: 50dvh;
    background-color: $bg-color1;
    position: fixed;
    left: 0;
    top: clamp(3.625rem, 3.338rem + 1.438vi, 5.063rem);
    padding-top: 1rem;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      width: toRem(200);
    }

    @media (max-width: toRem(1390)) {
      max-width: 100%;
      width: 100%;
      height: 60px;
      padding: 0 1.5rem;
		&:hover {
			width: 100%;
		}
    }

    &__list {
      // height: 100%;
      display: flex;
      flex-direction: column;
      // gap: 0.5rem;

      &:hover {
      //   width: 100%;
      }

      @media (max-width: toRem(1390)) {
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
    }
  }

  .side-menu__item {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid $text-color;
    flex-shrink: 1;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    img {
      width: 40px;
      height: 40px;
    }

    span {
      white-space: nowrap;
    }

    &:hover,
    &:focus {
		background-color: $color-btn;
    }
	 
    @media (max-width: toRem(1390)) {
      flex: 1 1 toRem(200);
      border-bottom: none;

      &:not(:last-of-type) {
        border-right: 1px solid $text-color;
      }
		span {
			display: block;
		}
    }
  }
</style>
