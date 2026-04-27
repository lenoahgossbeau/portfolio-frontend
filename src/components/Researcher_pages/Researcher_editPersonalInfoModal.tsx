'use client';
import Modal from "@/components/Modal_structure_Researcher_profile";
import { useEffect, useState } from "react";
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';

export default function EditPersonalInfoModal({ open, onClose, data, onSave }: any) {
  const { language } = useLanguage();
  const [form, setForm] = useState(data);
  const [errors, setErrors] = useState({
    name: "",
    profession: "",
    about: "",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(data.avatar);

  useEffect(() => {
    setForm(data);
    setImagePreview(data.avatar);
  }, [data]);

  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = t('name_required', language);
    if (!form.profession.trim()) newErrors.profession = t('profession_required', language);
    if (!form.about.trim()) newErrors.about = t('about_required', language);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const update = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ ...form, avatar: imagePreview });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t('personal_info', language)}</h3>
        <button onClick={handleSave} className="text-blue-600 font-medium">
          {t('save', language)}
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <label className="cursor-pointer">
          <img src={imagePreview || "/favicon.ico"} className="w-48 h-48 rounded-full object-cover" />
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <input
            placeholder={t('name', language)}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={`w-full border-b focus:border-blue-600 outline-none ${errors.name ? "border-red-600" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            placeholder={t('profession', language)}
            value={form.profession}
            onChange={(e) => update("profession", e.target.value)}
            className={`w-full border-b focus:border-blue-600 outline-none ${errors.profession ? "border-red-600" : ""}`}
          />
          {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
        </div>

        <div>
          <textarea
            placeholder={t('about_you', language)}
            value={form.about}
            onChange={(e) => update("about", e.target.value)}
            className={`w-full border rounded-lg p-2 resize-none focus:border-blue-600 outline-none ${errors.about ? "border-red-600" : ""}`}
            rows={4}
          />
          {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
        </div>
      </div>
    </Modal>
  );
}