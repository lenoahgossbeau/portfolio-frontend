'use client';
import Image from "next/image";
import favicon from "@/app/favicon.ico"
import { useState, useEffect } from "react";
import EditPersonalInfoModal from "./Researcher_editPersonalInfoModal";
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';
import { fetchWithAuth } from '@/lib/api';
import { API_BASE_URL } from '@/lib/api';
import ContactCard from "./ContactCard";
import SecurityCard from "./SecurityCard";

type Profile = {
  name: string;
  profession: string;
  about: string;
  avatar: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  twitter: string;
  github: string;
};

export default function PersonalInfoCard() {
  const { language } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${API_BASE_URL}/profiles/me`);
      const data = await response.json();
      
      setProfile({
        name: (data.first_name || '') + ' ' + (data.last_name || ''),
        profession: data.grade || '',
        about: data.bio || '',
        avatar: data.avatar || '',
        email: data.email || '',
        linkedin: data.linkedin || '',
        whatsapp: data.whatsapp || '',
        twitter: data.twitter || '',
        github: data.github || '',
      });
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedProfile: Profile) => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/profiles/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: updatedProfile.name.split(' ')[0] || '',
          last_name: updatedProfile.name.split(' ')[1] || '',
          grade: updatedProfile.profession,
          bio: updatedProfile.about,
          avatar: updatedProfile.avatar,
          email: updatedProfile.email,
          linkedin: updatedProfile.linkedin,
          whatsapp: updatedProfile.whatsapp,
          twitter: updatedProfile.twitter,
          github: updatedProfile.github,
        }),
      });
      
      if (response.ok) {
        setProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">{t('loading', language)}</div>;
  }

  if (!profile) {
    return <div className="text-center py-20">Aucun profil trouvé</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10 py-6">
      <div className="flex flex-row gap-5 justify-center">
        <div className="col-span-2 bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-base font-medium text-gray-700">{t('personal_info', language)}</h2>
            <button onClick={() => setIsEditing(true)} className="cursor-pointer text-gray-500 hover:text-gray-700 text-sm">✏️</button>
          </div>

          <EditPersonalInfoModal
            open={isEditing}
            onClose={() => setIsEditing(false)}
            data={profile}
            onSave={handleSave}
          />

          <div className="flex flex-col items-center w-86 mt-6 overflow-y-auto scrollbar-hide">
            <div className="w-42 h-42 rounded-full overflow-hidden mb-4">
              <Image
                src={profile.avatar || "/favicon.ico"}
                alt="profile"
                width={170}
                height={170}
                className="object-cover"
              />
            </div>

            <div className="text-left w-full max-w-sm">
              <p className="font-medium mb-1">
                {t('name', language)}: <span className="font-normal text-md"> {profile.name || t('no_name', language)} </span>
              </p>
              <p className="font-medium mb-1">
                {t('profession', language)}: <span className="font-normal text-md"> {profile.profession || t('no_profession', language)} </span>
              </p>
              <p className="font-medium mt-2">{t('about_you', language)}:</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed max-h-25 overflow-y-auto scrollbar-hide">
                {profile.about || t('no_about', language)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <ContactCard profile={profile} onSave={handleSave} />
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}