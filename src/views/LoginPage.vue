<template>
	<div class="wrapper">
		<router-link :to="{name: 'home'}" class="back">
			<font-awesome-icon :icon="['fas', 'left-long']" /> &nbsp;
			Назад на головну
		</router-link>
		<div class="login-container">
			<div>
				<div class="login-title">
					<img class="logo" src="@/assets/images/logo-SH.png" width="100">
					<h1>Вхід/реєстрація</h1>
				</div>
				<div class="login-content">
					<div class="login login">
						<form>
							<fieldset>
								<legend>Вхід</legend>
								<label for="email">Введіть адресу електронної пошти</label>
								<input type="email" v-model="emailForLogin">
								<label for="password">Пароль</label>
								<input type="password" v-model="passwordForLogin">
								<button type="submit" class="button" :disabled="!isDataValid" @click.prevent="loginWithEmailAndPassword(emailForLogin, passwordForLogin)">Увійти</button>
							</fieldset>
						</form>
					</div>
					<div class="login sign-up">
						<form>
							<fieldset>
								<legend>Реєстрація</legend>
								<label for="email">Введіть адресу електронної пошти</label>
								<input type="email" id="email" v-model="email">
								<label for="password">Пароль</label>
								<input type="password" id="password" v-model="password">
								<button type="submit" class="button" :disabled="!isDataValid"  @click.prevent="registerWithEmailAndPassword(email, password)">Зареєструватись</button>
							</fieldset>
						</form>
					</div>
				</div>
				
				<div class="login-google">
					<p>або</p>
					<button class="button" @click="loginWithGoogle">
						<img src="@/assets/images/google-logo.svg" class="google-logo">
						<span>Вхід</span>
					</button>
				</div>
			</div>
		</div>

	</div>
	
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const { signUpWithWithEmailAndPassword, signInWithWithEmailAndPassword, loginWithGoogleAccount } =	authStore;

import { useRouter } from 'vue-router';
const router = useRouter();

const emailForLogin = ref(null);
const passwordForLogin = ref(null);

const email = ref(null);
const password = ref(null);
const isDataValid = computed(() => {
	return email.value && password.value
});

function registerWithEmailAndPassword(email, password) {
	signUpWithWithEmailAndPassword(email, password).then(() => {
		router.push({
			name: 'home'
		})
	})
}

function loginWithEmailAndPassword(email, password) {
	signInWithWithEmailAndPassword(email, password).then(() => {
		router.push({
			name: 'home'
		})
	})
}

function loginWithGoogle() {
	loginWithGoogleAccount().then(() => {
		router.push({
			name: 'home'
		})
	})
}

</script>

<style lang="scss" scoped>
.login-container {
	margin: 5vh 5vw 10vh;
	padding: 5%;
	border: 1px solid $text-color;
}
.login-title {
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-bottom: 2em;
	.logo {
		width: clamp(3.125rem, 2.5rem + 3.125vw, 5rem);
	}
	h1 {
		font-size: clamp(1.125rem, 0.583rem + 2.708vw, 2.75rem);
		font-weight: 600;
		margin: 0 auto;
	}
}
.login-content {
	display: flex;
	gap: 2rem;
	flex-wrap: wrap;
	justify-content: center;
	// align-items: center;
}
.login {
	flex: 1 0 45%;
	fieldset {
		border: 1px solid $text-color;
		padding: 1.5rem 2rem;
		&:hover, &:focus{
			border: 2px solid $color2;
		}
		@media (max-width:475px) {
			padding: 1rem;
		}
	}
	legend {
		font-weight: 600;
		font-size: 1.25em;
		padding: .5rem .75rem;
	}
	label, input {
		display: block;
		margin-bottom: .75rem;
		min-width: 100%;
	}
	input {
		border: 1px solid $text-color;
		border-radius: .5rem;
		padding: 0.5rem;
	}

}
.login-google {
	text-align: center;
	margin-top: 3em;
	p {
		margin-bottom: 1.5em;
	}
	.button {
		padding: .5em 1.75em;
		margin: 0 auto;
		display: flex;
		align-items: center;
		gap: 1em;
	}
	.google-logo {
		width: 35px;
	}
}
.back {
	font-weight: 600;
	&:hover {
		color: $color2;
	}
}


</style>