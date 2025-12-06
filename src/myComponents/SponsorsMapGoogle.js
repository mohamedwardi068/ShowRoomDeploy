import React, { useState, useEffect, useRef } from "react";

const sponsors = [
  { id: 1, name: "Sponsor Alpha", description: "Leading tech partner in AI.", city: "Tunis", lat: 36.8, lng: 10.2 },
  { id: 2, name: "Sponsor Beta", description: "Premier financial institution.", city: "Sfax", lat: 34.74, lng: 10.76 },
  { id: 3, name: "Sponsor Gamma", description: "Global startup accelerator.", city: "Sousse", lat: 35.82, lng: 10.64 },
  { id: 4, name: "Sponsor Delta", description: "Major media conglomerate.", city: "Kairouan", lat: 35.67, lng: 10.1 },
];

const SponsorsMap = () => {
  const [selected, setSelected] = useState(sponsors[0]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current && !googleMapRef.current) {
      // Initialize map
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 35.7, lng: 10 },
        zoom: 7.9,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e3f2fd" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#fafafa" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
          }
        ]
      });

      // Create markers
      sponsors.forEach(sponsor => {
        const marker = new window.google.maps.Marker({
          position: { lat: sponsor.lat, lng: sponsor.lng },
          map: googleMapRef.current,
          title: sponsor.name
        });

        marker.addListener("click", () => setSelected(sponsor));
        markersRef.current.push({ marker, sponsor });
      });
    }
  }, [mapLoaded]);

  useEffect(() => {
    // Update marker icons when selection changes
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(({ marker, sponsor }) => {
        const isSelected = sponsor.id === selected.id;
        
        const icon = {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
            isSelected
              ? `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                   <defs>
                     <radialGradient id="glow${sponsor.id}" cx="50%" cy="50%" r="50%">
                       <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
                       <stop offset="100%" style="stop-color:#1e40af;stop-opacity:0" />
                     </radialGradient>
                     <filter id="shadow${sponsor.id}">
                       <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
                     </filter>
                   </defs>
                   <circle cx="20" cy="20" r="16" fill="url(#glow${sponsor.id})" opacity="0.6">
                     <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite"/>
                     <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite"/>
                   </circle>
                   <circle cx="20" cy="20" r="8" fill="#2563eb" stroke="#3b82f6" stroke-width="2" filter="url(#shadow${sponsor.id})"/>
                   <circle cx="20" cy="20" r="3" fill="#ffffff"/>
                 </svg>`
              : `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                   <defs>
                     <filter id="soft-shadow${sponsor.id}">
                       <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.2"/>
                     </filter>
                   </defs>
                   <circle cx="16" cy="16" r="6" fill="#1f2937" stroke="#374151" stroke-width="1.5" filter="url(#soft-shadow${sponsor.id})"/>
                   <circle cx="16" cy="16" r="2" fill="#ffffff" opacity="0.9"/>
                 </svg>`
          ),
          scaledSize: new window.google.maps.Size(isSelected ? 40 : 32, isSelected ? 40 : 32),
          anchor: new window.google.maps.Point(isSelected ? 20 : 16, isSelected ? 20 : 16)
        };
        
        marker.setIcon(icon);
      });
    }
  }, [selected]);

  return (
    <div className="flex flex-col items-center w-full px-6 py-16 min-h-screen bg-white">
      {/* Luxury Header */}
      <div className="max-w-5xl w-full text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent blur-3xl -z-10"></div>
        <p className="text-sm uppercase tracking-widest text-gray-500 font-light mb-3">
          Premium Partners
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-black mb-4 tracking-tight">
          Tunisia
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mb-6"></div>
        <p className="text-lg text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
          Discover our distinguished sponsors across Tunisia's vibrant cities
        </p>
      </div>

      {/* Elevated Map Container */}
      <div className="w-full max-w-6xl mb-16 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 via-gray-100/50 to-blue-100/50 rounded-3xl blur-2xl opacity-60"></div>
        <div className="relative bg-white p-3 rounded-3xl shadow-2xl">
          <div
            ref={mapRef}
            className="w-full h-96 md:h-[600px] rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>

      {/* Luxury Sponsor Cards */}
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer bg-white ${
                selected.id === sponsor.id
                  ? "scale-[1.02]"
                  : "hover:scale-[1.01]"
              }`}
              onClick={() => setSelected(sponsor)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Blue Glow Border for Selected */}
              {selected.id === sponsor.id && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-400/5"></div>
              )}
              
              {/* Shimmer Effect */}
              {selected.id === sponsor.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-shimmer"></div>
              )}
              
              {/* Border */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                selected.id === sponsor.id
                  ? "ring-2 ring-blue-600/40 shadow-2xl shadow-blue-600/25"
                  : "ring-1 ring-black/10 shadow-lg group-hover:ring-black/20"
              }`}></div>

              {/* Content */}
              <div className="relative p-8 bg-white rounded-2xl">
                {/* City Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${
                    selected.id === sponsor.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30"
                      : "bg-black text-white"
                  }`}>
                    {sponsor.city}
                  </span>
                  {selected.id === sponsor.id && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                  )}
                </div>

                {/* Sponsor Name */}
                <h3 className="text-2xl font-light text-black mb-3 tracking-tight">
                  {sponsor.name}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed font-light">
                  {sponsor.description}
                </p>

                {/* Decorative Line */}
                <div className={`mt-6 h-px transition-all duration-500 ${
                  selected.id === sponsor.id
                    ? "bg-gradient-to-r from-blue-600 via-blue-400 to-transparent"
                    : "bg-gradient-to-r from-gray-200 via-gray-100 to-transparent"
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default SponsorsMap;