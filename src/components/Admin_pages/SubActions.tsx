export default function SubscriptionActions({ subscriptions }: any) {

  const exportCSV = () => {
    try {
      console.log("CLICK CSV");
      console.log("DATA:", subscriptions);

      // ✅ Vérification des données
      if (!subscriptions || subscriptions.length === 0) {
        alert("Aucune donnée à exporter");
        return;
      }

      // ✅ En-têtes
      const headers = ["Username", "Email", "Amount", "Started At", "Next Billing Date"];

      // ✅ Lignes
      const rows = subscriptions.map((s: any) => [
        s.username ?? "",
        s.email ?? "",
        s.amount ?? "",
        s.startedAt ?? "",
        s.nextBillingDate ?? ""
      ]);

      // ✅ Création CSV propre
      const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(","))
        .join("\n");

      // ✅ Blob UTF-8 (important pour Excel)
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;"
      });

      const url = URL.createObjectURL(blob);

      // ✅ Téléchargement forcé
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "subscriptions.csv");
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Erreur export CSV :", err);
      alert("Erreur lors de l'export CSV");
    }
  };

  const exportPDF = () => {
    window.open("http://localhost:8000/admin/dashboard/export/pdf", "_blank");
  };

  return (
    <div className="flex justify-end gap-3">
      
      {/* ✅ CSV */}
      <button
        type="button"
        onClick={exportCSV}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Export CSV
      </button>

      {/* ✅ PDF */}
      <button
        type="button"
        onClick={exportPDF}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Export PDF
      </button>

    </div>
  );
}