'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const url = searchParams.get('url');

  if (!url) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        Aucun CV à afficher.
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* Header */}

      <div className="bg-white shadow px-6 py-4 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Aperçu du CV
          </h1>

          <p className="text-gray-500">
            Visualisation du document PDF
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
          >
            Retour
          </button>

          <a
            href={url}
            download
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Télécharger
          </a>

        </div>

      </div>

      {/* PDF */}

      <div className="flex-1 bg-gray-300 p-4">

        <iframe
          src={url}
          className="w-full h-full rounded-lg bg-white"
          title="CV"
        />

      </div>

    </div>
  );
}

export default function CVViewerPage() {
  return (
    <Suspense fallback={<div className="p-8">Chargement...</div>}>
      <ViewerContent />
    </Suspense>
  );
}