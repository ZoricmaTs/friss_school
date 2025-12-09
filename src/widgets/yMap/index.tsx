import './style.scss';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {useEffect} from 'react';
import "leaflet/dist/leaflet.css";

const coordinates: [number, number] = [42.848644, 74.608399];

// Исправление иконки (по умолчанию Leaflet не видит её в сборке Vite)
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function YMapLeaflet() {
  return (
    <MapContainer
      id={'maps-script'}
      center={coordinates}
      zoom={17}
      style={{ height: "400px"}}
    >
      {/* Подложка карты (OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Метка */}
      <Marker position={coordinates} icon={customIcon}>
        <Popup>
          Твоя локация 🎯
        </Popup>
      </Marker>
    </MapContainer>
  );
}