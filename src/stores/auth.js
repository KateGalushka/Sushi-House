import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import { useUsersStore } from './users'
import authOperations from './helpers/GoogleAuthOperations.js'

export const useAuthStore = defineStore('auth', () => {
  const generalStore = useGeneralStore();
  const usersStore = useUsersStore();
  const { generalApiOperation } = generalStore;

  const user = ref(null);
//   const user = ref({name: 'Kate', email: 'kgalushka@gmail.com'});

  const getUser = computed(() => user.value);

  

  async function signUpWithWithEmailAndPassword(email, password) {
    generalApiOperation({
      operation: () => authOperations.signUpWithWithEmailAndPassword({ email, password })
    }).then(async (res) => {
      user.value = res;
		console.log('user in auth: ', user.value)

      await usersStore.addUserWithCustomId({
        id: user?.value?.uid,
        data: {
          email,
          cart: []
      	}
      })
    })
  }

  async function signInWithWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      generalApiOperation({
        operation: () => authOperations.signInWithWithEmailAndPassword({ email, password })
      })
        .then((res) => {
          user.value = res;
			 console.log('user: ', user.value)
          usersStore
            .loadUserById(user.value.uid)
            .then(() => {
              resolve(res)
				  console.log('from usersStore: ', res)
            })
            .catch((error) => reject(error))
        })
        .catch((error) => reject(error))
    })
  }

  function loginWithGoogleAccount() {
    return new Promise((resolve, reject) => {
      generalApiOperation({
        operation: () => authOperations.loginWithGoogleAccountPopup()
      })
        .then((res) => {
          user.value = res
			 console.log('user: ', res)
			  
          usersStore
            .addUserWithCustomId({
              id: user?.value?.uid,
              data: {
                email: user?.value?.email,
					 name: user?.value?.displayName,
                cart: []
              }
            })
            .then(() => {
              usersStore.loadUserById(user.value.uid).then(() => {
                resolve(res)
              })
            })
        })
        .catch((error) => reject(error))
    })
  }

  function logOut() {
    generalApiOperation({
      operation: () => authOperations.logout()
    })
	 user.value = null
    usersStore.currentUser = null
  }

  async function getAuthData() {
    return user.value
  }

  return {
    signUpWithWithEmailAndPassword,
    signInWithWithEmailAndPassword,
    loginWithGoogleAccount,
    logOut,
    getUser,
    getAuthData
  }
})
