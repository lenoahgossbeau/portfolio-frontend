'use client';

import React, { useState } from "react";
import Resume from "@/sections/Resume";
import { FiUpload } from "react-icons/fi";
import PersonalInfoCard from "./PersonalInfoCard";
import Researcher_Project_Tab_Content from "./Researcher_Project_Tab_Content";
import Researcher_Publication_Tab_Content from "./Researcher_Publication_Tab_Content";
import MessagesView from "./MessagesView";
import CVUpload from "./CVUpload";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/locales/translations";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/lib/api";

const tabs = [
  { id: "profile", label: "profile" },
  { id: "resume", label: "resume_section" },
  { id: "project", label: "project_section" },
  { id: "publication", label: "publication_section" },
  { id: "messages", label: "messages" },
  { id: "payment", label: "payment" },
];

type Props = {
  admin?: boolean;
  mode?: "create" | "edit";
  researcherId?: number;
};

const ResearcherDashboard: React.FC<Props> = ({
  admin = false,
  mode = "create",
  researcherId,
}) => {
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<string>("profile");

  // États pour le paiement
  const [operator, setOperator] = useState("orange");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1000);
  const [processing, setProcessing] = useState(false);

  // Publication du profil
  const handlePublish = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Vous devez être connecté");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/researcher/publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(
          t("publish_success", language) ||
            "Profil publié avec succès !"
        );
      } else {
        toast.error(
          data.message || "Erreur lors de la publication"
        );
      }
    } catch (error) {
      console.error("Erreur publication :", error);
      toast.error("Erreur réseau");
    }
  };

  // Paiement Mobile Money
  const handlePayment = async () => {
    if (!phone || phone.length !== 9 || !phone.startsWith("6")) {
      toast.error("Numéro invalide (ex: 612345678)");
      return;
    }

    if (amount <= 0) {
      toast.error("Montant invalide");
      return;
    }

    setProcessing(true);

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `${API_BASE_URL}/payment/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            operator,
            phone,
            amount,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Paiement initié avec succès");
        setPhone("");
        setAmount(1000);
      } else {
        toast.error(data.detail || "Erreur paiement");
      }
    } catch (error) {
      console.error("Erreur paiement :", error);
      toast.error("Erreur réseau");
    } finally {
      setProcessing(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "project":
        return <Researcher_Project_Tab_Content />;

      case "publication":
        return <Researcher_Publication_Tab_Content />;

      case "resume":
        return (
          <div className="mt-[-20px]">
            <Resume editable={true} />

            <div className="mt-6">
              <CVUpload />
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="mt-10 text-center text-gray-600 text-lg">
            <PersonalInfoCard
              researcherId={researcherId}
              mode={mode}
            />
          </div>
        );

      case "messages":
        return <MessagesView />;

      case "payment":
        return (
          <div className="mt-10 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              {t("payment_title", language) ||
                "Paiement Mobile Money"}
            </h2>

            <div className="space-y-4">
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="orange">
                  Orange Money
                </option>

                <option value="mtn">
                  MTN Mobile Money
                </option>
              </select>

              <input
                type="tel"
                placeholder={
                  t("phone_placeholder", language) ||
                  "Numéro (ex: 612345678)"
                }
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                placeholder={
                  t("amount_placeholder", language) ||
                  "Montant (XAF)"
                }
                value={amount}
                onChange={(e) =>
                  setAmount(Number(e.target.value))
                }
                className="w-full border p-2 rounded"
              />

              <button
                type="button"
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {processing
                  ? t("processing", language) ||
                    "Paiement en cours..."
                  : t("pay", language) || "Payer"}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10 py-6">
      <div className="flex justify-between items-center w-full h-13">
        <div className="flex gap-0 p-2 rounded-full h-13 w-fit">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center text-sm gap-2 px-6 py-2 rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-[#E6EEF7] text-[#474747]"
                  : "text-[#A8A8A8] hover:bg-gray-200/30"
              }`}
            >
              {t(tab.label, language)}
            </button>
          ))}
        </div>

        {admin && mode === "create" && (
          <button
            type="button"
            onClick={handlePublish}
            className="cursor-pointer flex p-2 text-sm px-3 rounded-lg gap-2 items-center bg-[#003F7F] text-white"
          >
            <FiUpload size={17} />
            {t("publish", language)}
          </button>
        )}
      </div>

      {renderContent()}
    </div>
  );
};

export default ResearcherDashboard;