import { onMounted, ref } from 'vue';
import { defaultLocation } from '~/constants/location';

export default function getCurrentLocation() {
  const currentLocation = ref(defaultLocation);

  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          currentLocation.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.error('Error retrieving current location:', error);
        }
      );
    } else {
      console.warn('Geolocation not available');
    }
  });

  return { currentLocation };
}