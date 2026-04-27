'use client';
import Modal from "@/components/Modal_structure_Researcher_profile";
import { useState } from "react";
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';

export default function EditSecurityInfoModal({ open, onClose, data, onSave }: any) {
  const { language } = useLanguage();
  const [form, setForm] = useState(data);
  const [errors, setErrors] = useState({
    new_password: "",
    confirm_password: "",
  });

  const validate = () => {
    const newErrors: any = {};

    if (!form.new_password) {
      newErrors.new_password = t('password_required', language);
    } else if (form.new_password.length < 8) {
      newErrors.new_password = t('password_min_length', language);
    }

    if (!form.confirm_password) {
      newErrors.confirm_password = t('confirm_password_required', language);
    } else if (form.confirm_password !== form.new_password) {
      newErrors.confirm_password = t('password_mismatch', language);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const update = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSave = () => {
    if (!validate()) return;

    console.log("Password ready to be sent to backend:", form.new_password);

    setForm({ new_password: "", confirm_password: "" });
    alert(t('password_updated', language));

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t('security', language)}</h3>
        <button onClick={handleSave} className="text-blue-600 font-medium">
          {t('save', language)}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="password"
            placeholder={t('new_password', language)}
            value={form.new_password}
            onChange={(e) => update("new_password", e.target.value)}
            className={`w-full border-b focus:border-blue-600 outline-none ${errors.new_password ? "border-red-600" : ""}`}
          />
          {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder={t('confirm_password', language)}
            value={form.confirm_password}
            onChange={(e) => update("confirm_password", e.target.value)}
            className={`w-full border-b focus:border-blue-600 outline-none ${errors.confirm_password ? "border-red-600" : ""}`}
          />
          {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
        </div>
      </div>
    </Modal>
  );
}