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
	<section class="wrapper map">
		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2575.299710736952!2d30.119115376820513!3d49.7992328340382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d342182b0a3fb7%3A0x71c87108a58bd62b!2z0LLRg9C70LjRhtGPINCv0YDQvtGB0LvQsNCy0LAg0JzRg9C00YDQvtCz0L4sINCR0ZbQu9CwINCm0LXRgNC60LLQsCwg0JrQuNGX0LLRgdGM0LrQsCDQvtCx0LsuLCAwOTEwMA!5e0!3m2!1suk!2sua!4v1706791288420!5m2!1suk!2sua" width="1280" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	 
	</section>
	 
	 
	</main-master-page>
  
</template>
<script setup>
import MainMasterPage from '@/masterPages/MainMasterPage.vue';
import OrderRules from '@/components/OrderRules.vue';
import AboutSection from '@/components/AboutSection.vue';

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
.map {
	iframe {
		max-width: 100%;
		width: 100%;
		margin: 0 auto;

	}
}



</style>
