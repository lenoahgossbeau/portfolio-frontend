'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';
import PublicNavbar from '@/components/PublicNavbar';
import toast from 'react-hot-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';

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
  cv: {
    skills: { name: string; level: string }[];
    languages: { name: string; level: string }[];
    degrees: { title: string; institution: string; year: string }[];
    experiences: { title: string; company: string; year: string; description: string }[];
  };
};

export default function ResearcherSlugPage() {
  const { language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<ResearcherProfile | null>(null);
  const [loading, setLoading] = useState(true);

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

  const getAvatarUrl = (avatarPath: string | null | undefined) => {
    if (!avatarPath || typeof avatarPath !== 'string') return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    if (avatarPath.startsWith('/')) return `${API_BASE_URL}${avatarPath}`;
    return `${API_BASE_URL}/${avatarPath}`;
  };

  if (loading) return <div className="text-center py-20">{t('loading', language)}</div>;
  if (!profile) return <div className="text-center py-20">{t('researcher_not_found', language)}</div>;

  const cv = profile.cv || { skills: [], languages: [], degrees: [], experiences: [] };

  return (
    <>
      <PublicNavbar key={`navbar-${language}`} />
      <main key={`main-${language}`} className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête avec photo - VERSION SIMPLIFIÉE SANS Next.js Image */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex items-center gap-6">
              {profile.avatar && typeof profile.avatar === 'string' ? (
                <img
                  src={getAvatarUrl(profile.avatar) || '/favicon.ico'}
                  alt={profile.firstName}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    const initials = document.createElement('div');
                    initials.className = 'w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-3xl font-bold text-white border-4 border-white';
                    initials.textContent = `${profile.firstName?.[0]}${profile.lastName?.[0]}`;
                    parent?.appendChild(initials);
                    e.currentTarget.remove();
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-3xl font-bold text-white border-4 border-white">
                  {profile.firstName?.[0]}{profile.lastName?.[0]}
                </div>
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

          {/* CV - Téléchargement */}
          <div id="cv" className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-3">{t('cv_title', language)}</h2>
            {profile.cvUrl && typeof profile.cvUrl === 'string' ? (
              <a href={getAvatarUrl(profile.cvUrl) || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {t('download_cv', language)}
              </a>
            ) : (
              <p className="text-gray-500">{t('no_cv', language)}</p>
            )}
          </div>

          {/* Compétences */}
          {cv.skills && cv.skills.length > 0 && (
            <div id="skills" className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-3">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill.name} {skill.level ? `(${skill.level})` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Langues - VERSION MODERNISÉE */}
          {cv.languages && cv.languages.length > 0 && (
            <div id="languages" className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-3">Langues</h2>
              <ul className="space-y-2">
                {cv.languages.map((lang, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <span className="font-medium min-w-[100px]">{lang.name}</span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      {lang.level === 'Natif' ? 'Natif' :
                       lang.level === 'Courant' ? 'Courant' :
                       lang.level === 'Intermédiaire' ? 'Intermédiaire' :
                       lang.level === 'Débutant' ? 'Débutant' :
                       lang.level || 'Non spécifié'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Diplômes */}
          {cv.degrees && cv.degrees.length > 0 && (
            <div id="degrees" className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-3">Diplômes / Certifications</h2>
              <ul className="space-y-2">
                {cv.degrees.map((degree, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-medium">{degree.title}</span>
                    {degree.institution && ` - ${degree.institution}`}
                    {degree.year && ` (${degree.year})`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expériences */}
          {cv.experiences && cv.experiences.length > 0 && (
            <div id="experiences" className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-3">Expériences</h2>
              <ul className="space-y-3">
                {cv.experiences.map((exp, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-medium">{exp.title}</span>
                    {exp.company && ` - ${exp.company}`}
                    {exp.year && ` (${exp.year})`}
                    {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
        </div>
      </main>
    </>
  );
}