import { MapContainer, TileLayer } from "react-leaflet";

const center = [51.505, -0.09];

const LeafletMap = () => {
  return (
    <MapContainer enter={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></TileLayer>
    </MapContainer>
  );
};

export default LeafletMap;
