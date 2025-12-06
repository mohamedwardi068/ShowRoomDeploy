import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Sponsor Data
const sponsors = [
  { id: 1, name: "Sponsor Alpha", description: "Leading tech partner in AI.", city: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { id: 2, name: "Sponsor Beta", description: "Premier financial institution.", city: "London", lat: 51.5074, lng: -0.1278 },
  { id: 3, name: "Sponsor Gamma", description: "Global startup accelerator.", city: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { id: 4, name: "Sponsor Delta", description: "Major media conglomerate.", city: "New York", lat: 40.7128, lng: -74.006 },
];

const SponsorsMap = () => {
  const [selected, setSelected] = useState(sponsors[0]);

  // Custom pointer marker with pulse animation for selected
  const createPointerIcon = (isSelected) =>
    L.divIcon({
      className: "custom-pointer",
      html: `<div class="${
        isSelected
          ? 'w-5 h-5 bg-blue-600 border-white border-2 rounded-full shadow-lg shadow-blue-500/80 animate-pulse-pointer'
          : 'w-3 h-3 bg-blue-300 border-gray-900 border-2 rounded-full hover:w-4 hover:h-4 transition-all'
      }"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

  return (
    <div className="flex flex-col items-center w-full p-6 sm:p-12 min-h-screen font-sans">
      {/* Header */}
      <div className="max-w-4xl w-full text-center mb-8 md:mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Our  <span className="text-blue-600">Sponsors</span> Around the World
        </h2>
        <p className="text-lg text-gray-600 font-light max-w-xl mx-auto border-b-2 border-blue-500 pb-2">
          Our esteemed sponsors and their locations across the world.
        </p>
      </div>

      {/* Leaflet Map */}
      <div className="w-full max-w-6xl h-[450px] md:h-[550px] rounded-xl overflow-hidden shadow-2xl ring-4 ring-gray-900/10">
        <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {sponsors.map((sponsor) => (
            <Marker
              key={sponsor.id}
              position={[sponsor.lat, sponsor.lng]}
              icon={createPointerIcon(selected.id === sponsor.id)}
              eventHandlers={{
                click: () => setSelected(sponsor),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Sponsor Detail Card */}
      <div className="mt-10 w-full max-w-4xl">
        <div className="p-8 rounded-xl bg-white border border-gray-200 shadow-xl shadow-blue-100/50">
          <div className="flex items-center mb-3">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase rounded-full text-white bg-blue-600 shadow-md">
              {selected.city}
            </span>
            <h4 className="ml-4 text-2xl font-bold text-gray-900">{selected.name}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed pt-2 border-t border-gray-100">{selected.description}</p>
        </div>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes pulse-pointer {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pulse-pointer {
            animation: pulse-pointer 1.5s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default SponsorsMap;
