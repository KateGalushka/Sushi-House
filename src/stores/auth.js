import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useGeneralStore } from './general';
import { useUsersStore } from './users';
import authOperations from './helpers/GoogleAuthOperations.js';
import { notify } from './helpers/toastify';

export const useAuthStore = defineStore('auth', () => {
   const generalStore = useGeneralStore();
   const { generalApiOperation } = generalStore;

   const users_store = useUsersStore();
   const { currentUser } = storeToRefs(users_store);

   const authedUser = ref(null);
   //   const user = ref({name: 'Kate', email: 'kgalushka@gmail.com'});

   const getUser = computed(() => authedUser.value);

   const handleLoginErrors = (errorMsg) => {
      if (errorMsg == 'Firebase: Error (auth/email-already-in-use).') {
         notify('error', 'Користувач вже зареєстрований - будь ласка, увійдіть');
      }
      if (errorMsg == 'Firebase: Error (auth/invalid-credential).') {
         notify('error', 'Користувача не знайдено або дані введені неправильно!');
      }
   };

   async function signUpWithWithEmailAndPassword(email, password, user) {
      try {
         let signUpResult = await generalApiOperation({
            operation: () => authOperations.signUpWithWithEmailAndPassword(email, password),
            successCallback: () => notify('success', 'Ви успішно зареєструвались!'),
            errorCallBack: (errorMsg) => handleLoginErrors(errorMsg)
         });
         console.log('signUp result: ', signUpResult);
         if (signUpResult) {
            authedUser.value = signUpResult;
            await users_store.addUserWithCustomId({
               id: authedUser?.value?.uid,
               data: {
                  email,
						name: user.name,
						phone: user.phone,
               }
            });
         }
         return signUpResult;
      } catch (error) {
         console.log(error.message);
         reject(error);
      }
   }

   async function signInWithWithEmailAndPassword(email, password) {
      try {
         let signInResult = await generalApiOperation({
            operation: () => authOperations.signInWithWithEmailAndPassword(email, password),
            successCallback: () => notify('success', 'Ви успішно увійшли до свого акаунту!'),
            errorCallBack: (errorMsg) => handleLoginErrors(errorMsg)
         });
         if (signInResult) {
            authedUser.value = signInResult;
            // console.log('signInResult: ', signInResult);
            await users_store.loadUserById(authedUser.value.uid);
         }
         return signInResult;
      } catch {
         (error) => {
            // console.log(error.message);
            reject(error);
         };
      }
   }

   async function loginWithGoogleAccount() {
      try {
         let loginResult = await generalApiOperation({
            operation: () => authOperations.loginWithGoogleAccountPopup(),
            successCallback: () => notify('success', 'Ви успішно увійшли!'),
            errorCallback: () => notify('error', 'Щось пішло не так...')
         });
         if (loginResult) {
            authedUser.value = loginResult;
            // console.log('user: ', loginResult);

            await users_store.addUserWithCustomId({
               id: authedUser?.value?.uid,
               data: {
                  email: authedUser?.value?.email,
                  name: authedUser?.value?.displayName
               }
            });
            await users_store.loadUserById(authedUser.value.uid);
         }
         return loginResult;
      } catch {
         (error) => {
            reject(error);
         };
      }
   }

	async function loginWithCredential() {
      try {
         let loginResult = await generalApiOperation({
            operation: () => authOperations.loginWithCredential(),
            // successCallback: () => notify('success', 'Ви успішно увійшли!'),
            errorCallback: () => notify('error', 'Щось пішло не так...')
         });
         if (loginResult) {
            authedUser.value = loginResult;
            // console.log('loginResult in auth: ', loginResult);
            await users_store.loadUserById(authedUser.value.uid);
         }
         return loginResult?.user;
      } catch {
         (error) => {
            reject(error);
         };
      }
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
		loginWithCredential,
      logOut,
      getAuthData,
      getUser,
      authedUser
   };
});
