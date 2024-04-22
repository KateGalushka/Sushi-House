import DbOperations from './helpers/DbOperations'
const collectionDB = new DbOperations('orders')

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

export const useOrdersStore = defineStore('orders', () => {
  const { generalApiOperation } = useGeneralStore()
  const router = useRouter()

  const currentOrder = ref({})

  const notify = (type, message) => {
    if (type === 'success') {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    if (type === 'error') {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000
      })
    }
  }

  async function addOrder(orderData) {
    currentOrder.value = await generalApiOperation({
      operation: () => collectionDB.addItem(orderData),
      successCallback: () => {
        notify('success', 'Замовлення успішно відправлено');
      //   setTimeout(()=>router.push({ name: 'home' }), 3500);
      },
      errorCallBack: () => notify('error', 'Щось пішло не так...')
    })
  }

  return {
    currentOrder,
    addOrder
  }
})
