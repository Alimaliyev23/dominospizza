import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DominoAPI from "../services/DominoAPI";
import { useTranslation } from "react-i18next";

const api = new DominoAPI();

export default function DominosMapView() {
  const { i18n } = useTranslation();
  const currentLang = ["az", "en", "ru"].includes(i18n.language)
    ? i18n.language
    : "az";

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await api.getStores();
        setBranches(data.data);
      } catch (error) {
        console.error("Şöbə dataları alınmadı:", error);
      }
    };

    fetchBranches();
  }, []);

  const formatHour = (value) => {
    const str = value.toString().padStart(4, "0");
    const hours = str.slice(0, 2);
    const minutes = str.slice(2);
    return `${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-2 gap-8 md:gap-2">
      <div className="w-full md:w-2/3 h-[55vh] z-40 md:h-full rounded-lg overflow-hidden shadow">
        <MapContainer
          center={[40.4093, 49.8671]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {branches.map((branch) => (
            <Marker
              key={branch._id}
              position={[branch.location[1], branch.location[0]]}
            >
              <Popup>
                <strong>{branch.storeName[currentLang]}</strong>
                <br />
                {branch.address[currentLang]}
                <br />
                🕒 {formatHour(branch.openingHour)} –{" "}
                {formatHour(branch.closingHour)}
                <br />
                <a
                  href={branch.reviewURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Google Review
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="w-full md:w-1/3 overflow-y-auto p-4 bg-white shadow-md rounded-lg h-[45vh] md:h-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#003752]">
          Şöbələrimiz
        </h2>
        <div className="space-y-4">
          {branches.map((branch) => (
            <div
              key={branch._id}
              className="p-4 border rounded hover:bg-gray-50 transition"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={branch.picture}
                  alt={branch.storeName[currentLang]}
                  className="w-full sm:w-20 sm:h-20 h-40 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#D2112C]">
                    {branch.storeName[currentLang]}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {branch.address[currentLang]}
                  </p>
                  <p className="text-sm font-bold text-gray-500">
                    📞 {branch.phone}
                  </p>
                  <p className="text-sm text-yellow-600">
                    ⭐ {branch.googleRating}
                  </p>
                  <p className="text-sm text-gray-700">
                    🕒 Açılır: {formatHour(branch.openingHour)} – Bağlanır:{" "}
                    {formatHour(branch.closingHour)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
