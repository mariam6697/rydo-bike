<template>
    <GoogleMap 
        ref="mapRef" 
        :api-key="googleMapsApiKey" 
        :options="mapOptions" 
        :center="currentLocation" 
        style="width: 90vw; 
        height: 80vh;" 
        :zoom="15" 
        @click="onMapClick"
    >
        <Marker 
            v-for="marker in bikeMarkers" 
            :key="marker.id" 
            :options="{
            position: { lat: marker.lat, lng: marker.lng },
            icon: { url: marker.icon, scaledSize: { width: 40, height: 50 } }
        }" />
    </GoogleMap>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map';
import getCurrentLocation from '~/composables/get-location';
import { defaultMapOptions, londonMarkers, santiagoMarkers } from '~/constants/location';
import type IClickMapEvent from '~/interfaces/map';

const config = useRuntimeConfig();
const googleMapsApiKey = config.public.GOOGLE_MAPS_API_KEY;
const mapOptions = defaultMapOptions;
const { currentLocation } = getCurrentLocation();
const bikeMarkers = [...santiagoMarkers, ...londonMarkers];

async function onMapClick(_event: IClickMapEvent) {
    await navigateTo({ path: '/signup' });
};
</script>