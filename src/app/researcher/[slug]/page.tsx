'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';
import PublicNavbar from '@/components/PublicNavbar';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';  // 👈 AJOUT ICI

type ResearcherProfile = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profession: string;
  bio: string;
  cvUrl: string;
  avatar: string;
  publications: any[];
  projects: any[];
};

export default function ResearcherSlugPage() {
  const { language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<ResearcherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/researcher/public/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          toast.error('Chercheur non trouvé');
        }
      } catch (error) {
        console.error('Erreur chargement profil public:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProfile();
  }, [slug]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/contact/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          recipient_email: profile?.email
        })
      });
      if (res.ok) {
        toast.success('Message envoyé !');
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error('Erreur lors de l\'envoi');
      }
    } catch {
      toast.error('Erreur réseau');
    } finally {
      setSending(false);
    }
  };

  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    return `${API_BASE_URL}${avatarPath}`;
  };

  if (loading) return <div className="text-center py-20">{t('loading', language)}</div>;
  if (!profile) return <div className="text-center py-20">{t('researcher_not_found', language)}</div>;

  return (
    <>
      <PublicNavbar key={`navbar-${language}`} />
      <main key={`main-${language}`} className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête avec photo */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex items-center gap-6">
              {profile.avatar && (
                <Image
                  src={getAvatarUrl(profile.avatar) || ''}
                  alt={profile.firstName}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                <p className="text-blue-100">{profile.profession || t('not_specified', language)}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div id="bio" className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-3">{t('bio_title', language)}</h2>
            <p className="text-gray-700">{profile.bio || t('no_bio', language)}</p>
          </div>

          {/* CV */}
          <div id="cv" className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-3">{t('cv_title', language)}</h2>
            {profile.cvUrl ? (
              <a href={getAvatarUrl(profile.cvUrl)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {t('download_cv', language)}
              </a>
            ) : (
              <p className="text-gray-500">{t('no_cv', language)}</p>
            )}
          </div>

          {/* Publications */}
          <div id="publications" className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-3">{t('publications_title', language)}</h2>
            {profile.publications.length === 0 ? (
              <p className="text-gray-500">{t('no_publications', language)}</p>
            ) : (
              <ul className="space-y-2">
                {profile.publications.map((pub) => (
                  <li key={pub.id}>
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {pub.title} ({pub.year})
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Projets */}
          <div id="projects" className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-3">{t('projects_title', language)}</h2>
            {profile.projects.length === 0 ? (
              <p className="text-gray-500">{t('no_projects', language)}</p>
            ) : (
              <ul className="space-y-2">
                {profile.projects.map((proj) => (
                  <li key={proj.id}>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {proj.title} ({proj.year})
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Formulaire de contact */}
          <div id="contact" className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t('contact_title', language)} {profile.firstName}</h2>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <input
                type="text"
                placeholder={t('your_name', language)}
                required
                className="w-full border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder={t('your_email', language)}
                required
                className="w-full border p-2 rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                placeholder={t('your_message', language)}
                rows={4}
                required
                className="w-full border p-2 rounded"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {sending ? t('sending', language) : t('send', language)}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}