import DbOperations from './helpers/DbOperations';
const collectionDB = new DbOperations('orders');

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useGeneralStore } from './general';
import { notify } from './helpers/toastify.js';

export const useOrdersStore = defineStore('orders', () => {
  const { generalApiOperation } = useGeneralStore();

  const currentOrderSubmit = ref(null);

  async function addOrder(orderData) {
    currentOrderSubmit.value = await generalApiOperation({
      operation: () => collectionDB.addItem(orderData),
      successCallback: () => notify('success', 'Замовлення успішно відправлено'),
      errorCallBack: () => notify('error', 'Щось пішло не так...')
    })
  }

  return {
    currentOrderSubmit,
    addOrder,
    
  }
})
