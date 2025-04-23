export default interface IClickMapEvent {
    domEvent: MouseEvent;
    latLng: {
        lat: () => number;
        lng: () => number;
    };
    ni: { x: number; y: number };
    pixel: { x: number; y: number };
}
