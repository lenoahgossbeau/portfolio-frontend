'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { API_BASE_URL } from '@/lib/api'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/locales/translations'
import Navbar from '@/components/Navbar'

export default function ResearcherPublicPage() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const [researcher, setResearcher] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    fetch(API_BASE_URL + '/researcher/public/slug/' + slug)
      .then(res => res.json())
      .then(data => { if (data.error) setError(data.error); else setResearcher(data) })
      .catch(() => setError('Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <main><Navbar /><div className='flex justify-center items-center min-h-screen'><p className='text-gray-400 text-lg'>Chargement...</p></div></main>
  if (error || !researcher) return <main><Navbar /><div className='flex justify-center items-center min-h-screen'><p className='text-red-400 text-lg'>{error || 'Chercheur introuvable'}</p></div></main>

  return (
    <main>
      <Navbar />
      <section className='bg-gray-50 py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>{researcher.firstName} {researcher.lastName}</h1>
          <p className='text-gray-500 mt-1'>{researcher.profession}</p>
          <p className='text-gray-600 mt-4 max-w-2xl mx-auto'>{researcher.bio}</p>
        </div>
      </section>
      <section className='py-12 px-6 max-w-4xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-6'>{t('publication_section', language)}</h2>
        {!researcher.publications || researcher.publications.length === 0 ? <p>{t('no_data', language)}</p> : <div>{researcher.publications.map((pub: any) => <div key={pub.id}><h3>{pub.title}</h3><p>{pub.year}</p></div>)}</div>}
      </section>
      <section className='py-12 px-6 max-w-4xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-6'>{t('project_section', language)}</h2>
        {!researcher.projects || researcher.projects.length === 0 ? <p>{t('no_data', language)}</p> : <div>{researcher.projects.map((proj: any) => <div key={proj.id}><h3>{proj.title}</h3><p>{proj.year}</p></div>)}</div>}
      </section>
    </main>
  )
}
