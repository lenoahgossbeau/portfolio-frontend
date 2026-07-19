'use client';

import Modal from "@/components/Modal_structure_Researcher_profile";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/locales/translations";
import { API_BASE_URL } from "@/lib/api";
import toast from "react-hot-toast";

export default function EditPersonalInfoModal({
  open,
  onClose,
  data,
  onSave,
}: any) {
  const { language } = useLanguage();

  const [form, setForm] = useState(data);

  const [errors, setErrors] = useState({
    name: "",
    profession: "",
    about: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(data?.avatar || "");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(data);
    setImagePreview(data?.avatar || "");
    setImageFile(null);
  }, [data]);

  const validate = () => {
    const newErrors: {
      name?: string;
      profession?: string;
      about?: string;
    } = {};

    if (!form?.name?.trim()) {
      newErrors.name = t("name_required", language);
    }

    if (!form?.profession?.trim()) {
      newErrors.profession = t("profession_required", language);
    }

    if (!form?.about?.trim()) {
      newErrors.about = t("about_required", language);
    }

    setErrors({
      name: newErrors.name || "",
      profession: newErrors.profession || "",
      about: newErrors.about || "",
    });

    return Object.keys(newErrors).length === 0;
  };

  const update = (key: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Seuls les fichiers image sont acceptés");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 2MB");
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImage = async (
    file: File
  ): Promise<string | null> => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Vous devez être connecté");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${API_BASE_URL}/profiles/upload-photo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        return result.photo_url;
      }

      toast.error(
        result.detail ||
          "Erreur lors du téléchargement de la photo"
      );

      return null;
    } catch (error) {
      console.error("Erreur upload photo :", error);
      toast.error("Erreur réseau");
      return null;
    }
  };

  const handleSave = async () => {
    if (!validate()) return;

    setUploading(true);

    try {
      let avatarUrl = form.avatar;

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);

        if (!uploadedUrl) {
          return;
        }

        avatarUrl = uploadedUrl;
        setImagePreview(uploadedUrl);
      }

      const updatedProfile = {
        ...form,
        avatar: avatarUrl,
      };

      await onSave(updatedProfile);

      setImageFile(null);
      onClose();
    } catch (error) {
      console.error("Erreur sauvegarde profil :", error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setUploading(false);
    }
  };

  if (!form) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {t("personal_info", language)}
        </h3>

        <button
          type="button"
          onClick={handleSave}
          disabled={uploading}
          className={`text-blue-600 font-medium ${
            uploading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {uploading
            ? language === "fr"
              ? "Téléchargement..."
              : "Uploading..."
            : t("save", language)}
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <label className="cursor-pointer">
          <img
            key={imagePreview || "default"}
            src={imagePreview || "/favicon.ico"}
            className="w-48 h-48 rounded-full object-cover border-2 border-gray-200"
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = "/favicon.ico";
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <p className="text-center text-xs text-gray-500 mt-1">
            {language === "fr"
              ? "Cliquez pour changer la photo"
              : "Click to change photo"}
          </p>
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <input
            placeholder={t("name", language)}
            value={form.name || ""}
            onChange={(e) =>
              update("name", e.target.value)
            }
            className={`w-full border-b focus:border-blue-600 outline-none ${
              errors.name ? "border-red-600" : ""
            }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <input
            placeholder={t("profession", language)}
            value={form.profession || ""}
            onChange={(e) =>
              update("profession", e.target.value)
            }
            className={`w-full border-b focus:border-blue-600 outline-none ${
              errors.profession ? "border-red-600" : ""
            }`}
          />

          {errors.profession && (
            <p className="text-red-500 text-sm">
              {errors.profession}
            </p>
          )}
        </div>

        <div>
          <textarea
            placeholder={t("about_you", language)}
            value={form.about || ""}
            onChange={(e) =>
              update("about", e.target.value)
            }
            className={`w-full border rounded-lg p-2 resize-none focus:border-blue-600 outline-none ${
              errors.about ? "border-red-600" : ""
            }`}
            rows={4}
          />

          {errors.about && (
            <p className="text-red-500 text-sm">
              {errors.about}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}