import { toast } from 'vue3-toastify';

export const notify = (type, message) => {
   if (type === 'success') {
      toast.success(message, {
         position: toast.POSITION.TOP_CENTER
      });
   } else if (type === 'error') {
      toast.error(message, {
         position: toast.POSITION.TOP_CENTER,
         autoClose: false,
         closeOnClick: true
      });
   } else if (type === 'warning') {
      toast.warning(message, {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 2000
      });
   } else {
      toast(message, {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 1500
      });
   }
};
