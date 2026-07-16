'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';
import { API_BASE_URL } from '@/lib/api';
import toast from 'react-hot-toast';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateResearcherModal({
  isOpen,
  onClose,
  onCreated,
}: Props) {
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'researcher',
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.password
    ) {
      toast.error(
        language === 'fr'
          ? 'Tous les champs sont requis'
          : 'All fields are required'
      );
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/admin/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          language === 'fr'
            ? 'Chercheur créé avec succès !'
            : 'Researcher created successfully!'
        );

        setForm({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          role: 'researcher',
        });

        onClose();
        onCreated();
      } else {
        toast.error(
          data.detail ||
            (language === 'fr'
              ? 'Erreur lors de la création'
              : 'Error creating researcher')
        );
      }
    } catch (error) {
      toast.error(
        language === 'fr'
          ? 'Erreur réseau'
          : 'Network error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4">
          {language === 'fr'
            ? 'Créer un chercheur'
            : 'Create a researcher'}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              {language === 'fr' ? 'Prénom' : 'First name'} *
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'fr' ? 'Prénom' : 'First name'}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">
              {language === 'fr' ? 'Nom' : 'Last name'} *
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'fr' ? 'Nom' : 'Last name'}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">
              {language === 'fr' ? 'Mot de passe' : 'Password'} *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">
              {language === 'fr' ? 'Rôle' : 'Role'}
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="researcher">
                {language === 'fr' ? 'Chercheur' : 'Researcher'}
              </option>
              <option value="admin">
                {language === 'fr' ? 'Administrateur' : 'Admin'}
              </option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            {t('cancel', language)}
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-1 px-4 py-2 rounded-lg text-sm text-white transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading
              ? (language === 'fr' ? 'Création...' : 'Creating...')
              : t('create', language)}
          </button>
        </div>
      </div>
    </div>
  );
}