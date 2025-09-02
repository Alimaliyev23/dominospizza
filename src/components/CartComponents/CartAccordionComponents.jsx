import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { path } from "../../App";
import { getLocalizedText } from "../../utils/getLocalizedText";

export const AccordionItem = ({ title, children, isOpen, onToggle  }) => (
  <div className="border-b">
    <button
      onClick={onToggle}
      className={clsx(
        "w-full flex justify-between items-center py-3 px-4 transform transition duration-300 ease-in-out",
        isOpen
          ? "bg-[#0078BC] text-white scale-105"
          : "bg-gray-100 text-black hover:bg-[#0078BC] hover:text-white"
      )}
    >
      <span className="font-semibold">{title}</span>
      <span className={isOpen ? "text-white" : "text-[#A4A4A4]"}>
        {isOpen ? "▲" : "▼"}
      </span>
    </button>
    <div
      className={clsx(
        "transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="p-4 bg-white">{children}</div>
    </div>
  </div>
);

export const ServiceButton = ({
  active,
  icon,
  altIcon,
  label,
  onClick,
  activeClass,
}) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex-1 flex justify-center items-center gap-2 uppercase text-sm font-bold py-2 px-4 rounded-lg border transition",
      active ? activeClass : "border-gray-300 text-[#A4A4A4] hover:bg-gray-50"
    )}
  >
    <img src={active && altIcon ? altIcon : icon} className="w-8 h-8" alt="" />
    {label}
  </button>
);

export const CartAccordion = ({
  serviceType,
  setServiceType,
  openIndex,
  toggleAccordion,
  address,
  handleAddressChange,
  branches,
  selectedBranch,
  setSelectedBranch,
  formatHour,
  setPaymentMethod,
}) => {
  const { t, i18n } = useTranslation();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      <AccordionItem
        title={t("serviceType")}
        isOpen={openIndex === 0}
        onToggle={() => toggleAccordion(0)}
      >
        <div className="flex gap-4">
          <ServiceButton
            active={serviceType === "pickup"}
            icon={`${path}dominoHome.png`}
            altIcon={`${path}dominoHomeAg.png`}
            label={t("pickup")}
            onClick={() => setServiceType("pickup")}
            activeClass="border-red-600 bg-red-600 text-white"
          />
          <ServiceButton
            active={serviceType === "delivery"}
            icon={`${path}scooter.png`}
            altIcon={`${path}scooterAg.png`}
            label={t("delivery")}
            onClick={() => setServiceType("delivery")}
            activeClass="border-red-600 bg-red-600 text-white"
          />
        </div>
      </AccordionItem>

      <AccordionItem
        title={t("deliveryTime")}
        isOpen={openIndex === 1}
        onToggle={() => toggleAccordion(1)}
      >
        <select className="w-full border rounded p-2 outline-none">
          <option>{t("now")}</option>
          <option>{t("later")}</option>
        </select>
      </AccordionItem>

      {serviceType === "delivery" && (
        <AccordionItem
          title={t("deliveryAddress")}
          isOpen={openIndex === 2}
          onToggle={() => toggleAccordion(2)}
        >
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder={t("addressPlaceholder")}
            className="w-full border rounded p-2 outline-none"
          />
        </AccordionItem>
      )}

      <AccordionItem
        title={t("branchInfo")}
        isOpen={openIndex === 3}
        onToggle={() => toggleAccordion(3)}
      >
        {branches.length === 0 ? (
          <p>{t("branchDetails")}</p>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
            {selectedBranch ? (
              <div className="border p-3 rounded bg-gray-50">
                <p className="font-semibold text-[#D2112C]">
                  {getLocalizedText(selectedBranch.storeName, i18n)}
                </p>
                <p className="text-sm text-gray-600">
                  {getLocalizedText(selectedBranch.address, i18n)}
                </p>
                <p className="text-sm font-bold text-gray-500">
                  📞 {selectedBranch.phone}
                </p>
                <p className="text-sm text-yellow-600">
                  ⭐ {selectedBranch.googleRating}
                </p>
                <p className="text-sm text-gray-700">
                  🕒 {formatHour(selectedBranch.openingHour)} –{" "}
                  {formatHour(selectedBranch.closingHour)}
                </p>
                {getLocalizedText(selectedBranch.description, i18n)?.trim() && (
                  <p className="text-sm text-gray-600 mt-2">
                    {getLocalizedText(selectedBranch.description, i18n)}
                  </p>
                )}
                <button
                  onClick={() => setSelectedBranch(null)}
                  className="mt-4 px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                  🔙 {t("backToBranches")}
                </button>
              </div>
            ) : (
              branches.map((branch) => (
                <div
                  key={branch._id}
                  className="border p-3 rounded cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setSelectedBranch(branch)}
                >
                  <p className="font-semibold text-[#D2112C]">
                    {getLocalizedText(branch.storeName, i18n)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getLocalizedText(branch.address, i18n)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatHour(branch.openingHour)} –{" "}
                    {formatHour(branch.closingHour)}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </AccordionItem>

      <AccordionItem
        title={t("note")}
        isOpen={openIndex === 4}
        onToggle={() => toggleAccordion(4)}
      >
        <textarea
          placeholder={t("notePlaceholder")}
          className="w-full border rounded p-2 outline-none"
        />
      </AccordionItem>

      <AccordionItem
        title={t("paymentMethod")}
        isOpen={openIndex === 5}
        onToggle={() => toggleAccordion(5)}
      >
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cash"
              onChange={handlePaymentChange}
            />
            {t("cash")}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              onChange={handlePaymentChange}
            />
            {t("card")}
          </label>
        </div>
      </AccordionItem>
    </>
  );
};
