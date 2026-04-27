'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';

export default function SubscriptionActions({ subscriptions }: any) {
  const { language } = useLanguage();

  const exportCSV = () => {
    console.log("=== EXPORT CSV ===");
    console.log("subscriptions reçues:", subscriptions);
    console.log("type:", typeof subscriptions);
    console.log("longueur:", subscriptions?.length);
    
    if (!subscriptions || subscriptions.length === 0) {
      alert("Aucune donnée à exporter (tableau vide)");
      return;
    }

    try {
      const headers = [
        'ID',
        'ID Profil', 
        'Date début',
        'Date fin',
        'Type',
        'Moyen de paiement'
      ];

      const rows = subscriptions.map((s: any) => [
        s.id ?? "",
        s.profile_id ?? "",
        s.start_date ?? "",
        s.end_date ?? "",
        s.type ?? "",
        s.payment_method ?? ""
      ]);

      let csvContent = headers.join(",") + "\n";
      rows.forEach(row => {
        csvContent += row.join(",") + "\n";
      });

      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `subscriptions_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log("CSV exporté avec succès !");
      alert("Export CSV réussi !");
      
    } catch (err) {
      console.error("Erreur:", err);
      alert("Erreur: " + err);
    }
  };

  return (
    <button
      type="button"
      onClick={exportCSV}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
    >
      {t('export', language)}
    </button>
  );
}