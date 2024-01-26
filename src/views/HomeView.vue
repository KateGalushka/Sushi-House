<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
	<header class="wrapper">
		<NavBar/>
	</header>
  <main>
    <section class="wrapper top">
		 <div class="top__inner">
			<div class="top__inner-content">
				<h1>Найсмачніші суші	у твоєму місті</h1>
				<p>Замовляйте улюблені страви онлайн</p>
				<div class="top__inner-btns">
					<button class="button">Перейти до меню</button>
					<button class="button">Умови доставки</button>
				</div>
			</div>
			<img class="top__inner-img" src="@/assets/images/home.png">
		</div>
	 </section>
	 <div>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia earum nihil unde assumenda veniam inventore repellendus culpa soluta odio. Et neque praesentium cum dolorum ducimus quae fugiat optio ipsa. Ipsum.
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, ut, libero excepturi ab magnam ratione maiores sed nulla asperiores, quam beatae itaque distinctio deserunt! Eius, molestiae, beatae minima veniam, pariatur doloremque eum nulla quibusdam eligendi nemo maiores voluptatem voluptatibus labore nam? Sunt eveniet esse quibusdam praesentium natus nostrum enim fugiat adipisci veniam iure? Aut deleniti sit quasi, eum eligendi earum sed ut eaque at tempore, quos consequatur, harum maiores nulla nemo labore facilis. Aperiam fugit sapiente voluptas accusantium ullam. Asperiores ullam sapiente sint voluptates sequi magnam ut accusamus veniam voluptas, libero laborum amet quis, dolore velit fugit eveniet quo delectus!

	 </div>
  </main>
</template>

<style lang="scss" scoped>
.top__inner {
	display: flex;
	align-items: center;
	padding: 1.5rem;
	&-img{
		object-fit: cover;
		max-width: 60%;
		flex: 1 1 auto;
		overflow: clip;
	}
	&-content {
		display: flex;
		flex-direction: column;
		gap: 1em;
		
		h1{
			text-transform: uppercase;
			letter-spacing: 1px;
			font-size: clamp(1.125rem, 0.55rem + 2.875vw, 4rem);
			font-weight: 700;
			line-height: 1.15;
		}
	}
	&-btns {
		display: flex;
		gap: .75em;
	}

}

</style>
