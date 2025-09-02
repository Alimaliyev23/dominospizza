import { useNavigate } from "react-router-dom";
import { path } from "../App";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-center px-4 z-[9999]">
      <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
        404 - Səhifə tapılmadı
      </h1>

      <video
        src={`${path}koppernik.mp4`}
        autoPlay
        loop
        playsInline
        className="w-full max-w-md mb-6 rounded shadow"
      >
        Sənin brauzerin video elementini dəstəkləmir.
      </video>

      <p className="text-gray-700 text-base sm:text-lg mb-6">
        Axtardığınız səhifə mövcud deyil və ya silinmişdir.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
      >
        Ana səhifəyə qayıt
      </button>
    </div>
  );
};

export default NotFound;
