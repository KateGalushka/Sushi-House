<template>
	<div v-if="user" class="user-profile">
		<span>{{ user.displayName ?? user.email }}</span>
		<img v-if="imgSrc" :src="imgSrc">
		<!-- <font-awesome-icon v-else :icon="['far', 'circle-user']" size="lg" /> -->
		<button class="login-btn" @click="onLogout">
			<font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
		</button>
	</div>
	<div v-else>
		<button class="login-btn" @click="onLogin">
			<font-awesome-icon :icon="['far', 'user']" />
			&nbsp;<span>Вхід</span>
		</button>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.getUser);
		
const	imgSrc = computed(() => {
	// console.log('photo: ', user.value.photoURL);
	return user.value.photoURL;
}); 

import { useRouter } from 'vue-router';
const router = useRouter();
			
function onLogin() {
	router.push({
		name: 'login'
	})
}

function onLogout() {
	authStore.logOut();
	router.go();
	router.push({
		name: 'home'
	})
}	
	

</script>

<style lang="scss" scoped>
.user-profile {
	display: flex;
	// flex-wrap: wrap;
	justify-content:center;
	align-items: center; 
	gap: 0.5em;
	img{
		border-radius: 50%;
		width: 2.25rem;
	}
}
.login-btn {
	padding:  0.25rem 0.5rem;
	border: 1px solid $text-color;
	border-radius: 5px;
	&:hover, &:focus {
		color: $color2;
		border-color: $color2;
	}
}

@media (max-width:768px) {
	.user-profile, .login-btn {
		font-size: 1rem;
	}
}
</style>