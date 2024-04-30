import { storage } from './../../firebase-config'; 
import { storageRef } from './../../firebase-config'; 
import { ref as refStor, getDownloadURL } from 'firebase/storage';
import { ref, computed} from 'vue';
import { defineStore } from 'pinia';
import { useGeneralStore } from './general';

export const useStorageStore = defineStore('storage', () => {
	const imagesPaths = ref([]);

	const generalStore = useGeneralStore();
   const { generalApiOperation } = generalStore;

	async function setImagePath(imageName) {
		try {
			const res = await generalApiOperation({
				operation: () => getImageUrl(imageName)
			});
			return res;
		} catch {
			(error) => console.error(error.message);
		}
	}

	async function getImageUrl(imageName){
		const imagesRef = refStor(storageRef, 'dishesImages');
		const imageItem = refStor(imagesRef, imageName);
		const imageUrl = await getDownloadURL(imageItem);
		// console.log(imageUrl);
		imagesPaths.value.push(imageUrl);
		return imageUrl;
	}

	const getImagesPaths = computed(() => {
		// console.log("paths: ", imagesPaths.value);
		return imagesPaths.value
	});

	return {
      imagesPaths,
      getImagesPaths,

      setImagePath,
      getImageUrl
   };
})