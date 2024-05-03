import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { notify } from './helpers/toastify';

export const useGeneralStore = defineStore('general', () => {
  const loading = ref(null);
  const isLoadingToastShown = ref(false);
  const error = ref(null);
  const msg = ref('');

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value);

  function setLoading(val) {
	loading.value = val;
	if (val && !isLoadingToastShown.value) {
		isLoadingToastShown.value = true;
		notify('', 'Loading...');
	} else if (!val && isLoadingToastShown.value) {
		isLoadingToastShown.value = false;
	}
  };
  function setError(val) {
    error.value = val;
	 msg.value = error?.value?.message
	 if (val) {
		notify('error', msg.value || error.value);
	 }
  };
  function startLoading() {
    setLoading(true);
    setError(null);
  }
  //-------------
  async function generalApiOperation({ operation, successCallback, errorCallBack }) {
    startLoading();
    try {
      const res = await operation();
		// console.log('in general Store: ', res)
      if (successCallback) successCallback(res);
      return res;
    } catch (error) {
      setError(error);
      if (errorCallBack) errorCallBack(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { isLoading, hasError, setLoading, setError, startLoading, generalApiOperation }
})
