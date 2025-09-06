import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, logout } from "../store/authSlice";
import { PhoneInput } from "react-international-phone";
import { useTranslation } from "react-i18next";
import { clearFavorites } from "../store/favoritesSlice";
import { resetCartUser } from "../store/cartSlice";
import { clearWishlist } from "../store/wishlistSlice";

const bakuDistricts = [
  "Binəqədi",
  "Nərimanov",
  "Nəsimi",
  "Nizami",
  "Sabunçu",
  "Səbail",
  "Suraxanı",
  "Xətai",
  "Xəzər",
  "Yasamal",
];

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [district, setDistrict] = useState(user?.district || "");
  const [street, setStreet] = useState(user?.street || "");

  const handleSave = () => {
    const fullAddress = `${district}, ${street}`;
    const updatedUser = {
      name,
      surname,
      phone,
      district,
      street,
      address: fullAddress,
    };
    dispatch(login(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditMode(false);
  };

  if (!user) {
    return <div className="p-6 text-center">{t("loginPrompt")}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-6 text-[#003752] text-center">
        {t("profile")}
      </h2>

      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("name")}:
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("surname")}:
            </label>
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="max-w-sm mx-auto mb-4">
            <label className="block text-sm font-semibold mb-2">
              {t("phone")}:
            </label>
            <PhoneInput
              defaultCountry="AZ"
              value={phone}
              onChange={setPhone}
              className="w-full"
              inputComponent={({ value, onChange }) => (
                <input
                  value={value}
                  onChange={onChange}
                  className="w-full px-3 py-2 bg-black text-white border border-gray-500 rounded-lg focus:outline-none"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("district")}:
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">{t("selectDistrict")}</option>
              {bakuDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              {t("street")}:
            </label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder={t("streetPlaceholder")}
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-red-600 text-white"
            >
              {t("save")}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>{t("name")}:</strong> {user.name}
          </p>
          <p>
            <strong>{t("surname")}:</strong> {user.surname}
          </p>
          <p>
            <strong>{t("phone")}:</strong> {user.phone}
          </p>
          <p>
            <strong>{t("district")}:</strong> {user.district}
          </p>
          <p>
            <strong>{t("street")}:</strong> {user.street}
          </p>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 rounded bg-red-600 text-white"
            >
              {t("edit")}
            </button>
            <button
              onClick={() => {
                dispatch(logout());
                // Don't clear cart and wishlist on logout - keep them for next login
                dispatch(clearFavorites());
              }}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
