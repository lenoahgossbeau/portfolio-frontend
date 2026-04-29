'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';
import toast from 'react-hot-toast';

type Props = {
  subscriptions: any[];
};

export default function SubscriptionActions({ subscriptions }: Props) {
  const { language } = useLanguage();

  const exportCSV = () => {
    console.log("=== EXPORT CSV ===");
    console.log("subscriptions reçues:", subscriptions);
    console.log("type:", typeof subscriptions);
    console.log("longueur:", subscriptions?.length);
    
    if (!subscriptions || subscriptions.length === 0) {
      toast.error(t('no_data_to_export', language));
      return;
    }

    try {
      const headers = [
        t('id', language),
        t('profile_id', language),
        t('start_date', language),
        t('end_date', language),
        t('type', language),
        t('payment_method', language)
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
      toast.success(t('export_csv_success', language));  // ← MODIFIÉ ICI
      
    } catch (err) {
      console.error("Erreur:", err);
      toast.error(t('export_error', language));
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