<template>
	<main-master-page>
    <section class="wrapper">
		 <div class="hero">
			<div class="hero__content">
				<h1>Найсмачніші суші	у твоєму місті</h1>
				<p>Замовляйте улюблені страви онлайн</p>
				<div class="hero__btns">
					<button class="button" @click="scrollToOrderRules">
						Як замовити?
					</button>
					<button class="button">Перейти до меню</button>
				</div>
			</div>
			<img class="hero__img" src="@/assets/images/home.png">
		</div>
	 </section>
	
	<section class="wrapper rules" ref="orderRulesSection" id="orderRulesSection">
		<order-rules/>
	</section>
	<section class="wrapper about" ref="aboutSection" id="aboutSection">
	  <about-section/>
	</section>
	 
	 
	 
	</main-master-page>
  
</template>
<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue';
import OrderRules from '@/components/OrderRules.vue';
import AboutSection from '@/components/AboutSection.vue';
import { RouterView } from 'vue-router';
import { ref } from 'vue'; 

const orderRulesSection = ref();

const scrollToOrderRules = () => {
	if (orderRulesSection.value) {
		orderRulesSection.value.scrollIntoView({ behavior: 'smooth' });
	}
};



</script>

<style lang="scss" scoped>
.hero {
	display: flex;
	align-items: center;
	padding: 1.5rem;
	&__img{
		object-fit: cover;
		max-width: 60%;
		flex: 1 1 auto;
		overflow: clip;
	}
	&__content {
		display: flex;
		flex-direction: column;
		gap: 1em;
		
		h1{
			text-transform: uppercase;
			letter-spacing: 1px;
			font-size: clamp(1.125rem, 0.167rem + 4.792vw, 4rem);
			font-weight: 700;
			line-height: 1.15;
		}
	}
	&__btns {
		display: flex;
		gap: .75em;
		flex-wrap: wrap;
	}
	@media (max-width:768px) {
		margin-top: 6.5rem;
	
	}
}



</style>
