<template>
	<div class="footer__container">
		<div class="wrapper footer">
			<ul class="footer__section">
				<li>
					<router-link to="/" class="footer__logo">
						<img class="footer__logo-img" src="@/assets/images/logo-SH.png" alt="logo Sushi House" width="50">
					</router-link>
				</li>
				<li>
					<a href="about">Про компанію</a>
				</li>
				<li>
					<a href="#">Умови доставки і оплати</a>
				</li>
				<li>
					<a href="#">Акції</a>
				</li>
				<li>
					<a href="#">Юридична інформація</a>
				</li>
			</ul>
			<div class="footer__section">
				<div class="footer__section-contacts address">
					<h4>Наша адреса:</h4>
					<p>Київська обл., м.Біла Церква, вул.Ярослава Мудрого</p>
				</div>
				<div class="footer__section-contacts phone">
					<h4>Телефони для зв'язку:</h4>
					<p><a href="tel:08001112233">0-800-111-22-33</a></p>
					<p><a href="tel:08004445566">0-800-444-55-66</a></p>
				</div>
			</div>
		<div class="footer__section callMe">
			<p>Залиште свій номер, ми з Вами зв'яжемось:</p>
			<input v-model="userPhone" type="phone" placeholder="+38-099-999-99-99" aria-label="Введіть свій телефон">
			<button class="button submit" type="submit" :disabled="!isPhoneNumberValid" @click="handleSubmit">
				Відправити
			</button>
		</div>
		<div class="footer__section socials">
			<a href="https://www.instagram.com/accounts/login/" target="_blank" class="instagram" aria-label="instagram">
				<font-awesome-icon :icon="['fab', 'instagram']" />
			</a>
			<a href="https://www.facebook.com/home.php" target="_blank" class="facebook" aria-label="facebook">
				<font-awesome-icon :icon="['fab', 'facebook']" />
			</a>
			<a href="https://www.viber.com" target="_blank" class="viber" aria-label="viber">
				<font-awesome-icon :icon="['fab', 'viber']" />
			</a>
			<a href="http://t.me/katuxa_galushka" target="_blank" class="telegram" aria-label="telegram">
				<font-awesome-icon :icon="['fab', 'telegram']" />
			</a>

		</div>
		</div>

	</div>
	
</template>

<script setup>
import { computed, ref } from 'vue';

const userPhone = ref(null);
const phoneRegExp = /^\+38[ -]?0\d{2}[ -]?\d{3}[ -]?\d{2}[- ]?\d{2}$/;
const isPhoneNumberValid = computed(()=> phoneRegExp.test(userPhone.value));

</script>

<style lang="scss" scoped>
.footer__container {
	background-color: $bg-color1;
}
.footer {
	padding: 1.5rem .5rem 3rem;
	display: grid;
	gap: 2em 1.5em;
	grid-template-columns: repeat(3, minmax(150px, 1.5fr)) .5fr;
	@media (max-width: toRem(990)) {
		grid-template-columns: repeat((2, 1fr));
	}
	@media (max-width: toRem(500)) {
		grid-template-columns: auto;
	}
}
.footer__section {
	line-height: 1.5;
	// &:not(:first-child) {
	// 	border-left: 1px dashed $text-color;
	// 	padding-left: 1rem;
	// 	}
		
	li {
		font-weight: 500;
		transition: all 0.3s ease-in;
		white-space: nowrap;
		&:hover {
			color: $color2;
		}
		.footer__logo-img {
			margin-bottom: 1em;
		}
	}
	&-contacts {
		&:not(:last-child) {
			margin-bottom: 1em;
		}
		h4 {
			font-size: 1.25rem;
			font-weight: 500;
		}
		a:hover {
			color: $color2;
		}
	}
	&.callMe {
		text-align: center;
		input {
			border: 1px dotted $text-color;
			padding: 0.5rem;
			margin: 1em auto;
			max-width: 250px;
			display: block;
			@media (max-width:990px) {
				display: inline-block;
				margin: 1em;
			}
		}
		.submit {
			padding: .35em .75em;
			&[disabled] {
				opacity: .3;
			}
		}
	}
	&.socials {
		display: grid;
		place-items: center;
		font-size: 1.5rem;
		@media (max-width:990px) {
			grid-template-columns: repeat((4, 1fr));
		}
		.instagram:hover, .instagram:focus {
			color: rgb(131, 58, 180);
		}
		.facebook:hover, .facebook:focus {
			color: rgb(24, 119, 242);
		}
		.viber:hover, .viber:focus {
			color: rgb(109, 28, 180);
		}
		.telegram:hover, .telegram:focus {
			color: rgb(0, 136, 204);
		}
	}
}


</style>