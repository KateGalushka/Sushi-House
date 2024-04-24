import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useGeneralStore } from './general';
import { useUsersStore } from './users';
import authOperations from './helpers/GoogleAuthOperations.js';

export const useAuthStore = defineStore('auth', () => {
   const generalStore = useGeneralStore();
   const { generalApiOperation } = generalStore;

   const users_store = useUsersStore();
   const { currentUser } = storeToRefs(users_store);

   const authedUser = ref(null);
   //   const user = ref({name: 'Kate', email: 'kgalushka@gmail.com'});

   const getUser = computed(() => authedUser.value);

   async function signUpWithWithEmailAndPassword(email, password) {
      generalApiOperation({
         operation: () => authOperations.signUpWithWithEmailAndPassword(email, password)
      }).then(async (res) => {
         authedUser.value = res;
         console.log('user in auth: ', authedUser.value);

         await users_store.addUserWithCustomId({
            id: authedUser?.value?.uid,
            data: {
               email,
               cart: []
            }
         });
      });
   }

   async function signInWithWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
         generalApiOperation({
            operation: () => authOperations.signInWithWithEmailAndPassword(email, password)
         })
            .then((res) => {
               authedUser.value = res;
               console.log('user: ', authedUser.value);
               users_store
                  .loadUserById(authedUser.value.uid)
                  .then(() => {
                     resolve(res);
                     console.log('from users_store: ', res);
                  })
                  .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
      });
   }

   function loginWithGoogleAccount() {
      return new Promise((resolve, reject) => {
         generalApiOperation({
            operation: () => authOperations.loginWithGoogleAccountPopup()
         })
            .then((res) => {
               authedUser.value = res;
               console.log('user: ', res);

               users_store
                  .addUserWithCustomId({
                     id: authedUser?.value?.uid,
                     data: {
                        email: authedUser?.value?.email,
                        name: authedUser?.value?.displayName
                     }
                  })
                  .then(() => {
                     users_store.loadUserById(authedUser.value.uid).then(() => {
                        resolve(res);
                     });
                  });
            })
            .catch((error) => reject(error));
      });
   }

   function logOut() {
      generalApiOperation({
         operation: () => authOperations.logout()
      });
      authedUser.value = null;
      currentUser.value = null;
      localStorage.removeItem('user');
   }

   async function getAuthData() {
      return authedUser.value;
   }

   return {
      signUpWithWithEmailAndPassword,
      signInWithWithEmailAndPassword,
      loginWithGoogleAccount,
      logOut,
      getAuthData,
      getUser,
      authedUser
   };
});
