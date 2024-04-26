import { auth } from '../../../firebase-config';
import {
   GoogleAuthProvider,
   signInWithPopup,
   signOut,
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword
} from 'firebase/auth';


class GoogleAuthOperations {
   constructor({
      saveCredentialsInLocalStorage = true,
      authCredentialLocalStorageKey = 'authCredential'
   } = {}) {
      this.saveCredentialsInLocalStorage = saveCredentialsInLocalStorage;
      this.authCredentialLocalStorageKey = authCredentialLocalStorageKey;
   }

   loginWithGoogleAccountPopup() {
      return new Promise((resolve, reject) => {
         const provider = new GoogleAuthProvider();
         signInWithPopup(auth, provider)
            .then((loginResult) => {
               // console.log(loginResult);
               resolve(loginResult?.user);
               if (loginResult?.user) {
                  localStorage.setItem('user', JSON.stringify(loginResult?.user));
               }
               let credential = GoogleAuthProvider.credentialFromResult(loginResult);
               console.log('credential: ', credential);
               localStorage.setItem('authCredential', JSON.stringify(credential));
            })
            .catch((error) => {
               reject(error);
               // const errorCode = error.code;
               // const errorMessage = error.message;
            });
      });
   }
	loginWithCredential() {
			return new Promise((resolve, reject) => {
				let credential = localStorage.getItem('authCredential');
				if (credential) {
					credential = JSON.parse(credential);
					const token = GoogleAuthProvider.credential(credential.idToken);

					signInWithCredential(auth, token)
						.then((loginResult) => {
							resolve(loginResult);
						})
						.catch((error) => {
							reject(false);
						});
				} else resolve(false)
			})
		}
   signUpWithWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
         if (!email || !password) reject(false);
         else {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
               .then((loginResult) => {
                  resolve(loginResult?.user);
                  if (loginResult?.user) {
                     localStorage.setItem('user', JSON.stringify(loginResult?.user));
                  }
                  // console.log('loginResult in createUserWithEmail: ', loginResult)
               })
               .catch((error) => {
                  console.log(error.message);
                  reject(error);
                  // const errorCode = error.code;
                  // const errorMessage = error.message;
               });
         }
      });
   }
   signInWithWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
         if (!email || !password) reject(false);
         else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
               .then((loginResult) => {
                  resolve(loginResult?.user);
                  if (loginResult?.user) {
                     localStorage.setItem('user', JSON.stringify(loginResult?.user));
                  }
               })
               .catch((error) => {
                  reject(error);
                  // const errorCode = error.code;
                  // const errorMessage = error.message;
               });
         }
      });
   }

   logout() {
      return new Promise((resolve, reject) => {
         signOut(auth)
            .then(() => {
               localStorage.removeItem(this.authCredentialLocalStorageKey);
               resolve(true);
            })
            .catch((error) => {
               reject(error);
            });
      });
   }
}

export default new GoogleAuthOperations(import.meta.VITE_SAVE_CREDENTIALS_IN_LOCAL_STORE);
