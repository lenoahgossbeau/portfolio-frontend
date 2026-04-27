import { useLanguage } from '@/hooks/useLanguage';
import { t } from '@/locales/translations';
import { useState } from 'react';

// Type local pour éviter les conflits
type Subscription = {
  id: string | number;
  profile_id: string | number;
  start_date: string;
  end_date: string;
  type: string;
  payment_method: string;
  amount?: number;
};

type Props = {
  subscriptions: Subscription[];
};

export default function SubscriptionTable({ subscriptions }: Props) {
  const { language } = useLanguage();
  const [filterType, setFilterType] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const uniqueTypes = [...new Set(subscriptions.map(s => s.type))];

  const filteredSubscriptions = subscriptions.filter(sub => {
    let match = true;
    if (filterType && sub.type !== filterType) match = false;
    if (filterStartDate && sub.start_date < filterStartDate) match = false;
    if (filterEndDate && sub.end_date > filterEndDate) match = false;
    return match;
  });

  const resetFilters = () => {
    setFilterType('');
    setFilterStartDate('');
    setFilterEndDate('');
  };

  if (subscriptions.length === 0) {
    return <div className="text-center py-4 text-gray-400">{t('no_subscriptions', language)}</div>;
  }

  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-600 mb-1">{t('type', language)}</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">{t('all', language) || 'Tous'}</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">{t('start_date', language)}</label>
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">{t('end_date', language)}</label>
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          />
        </div>
        
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm"
        >
          {t('reset', language) || 'Réinitialiser'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-[#ADADAD]">
            <tr className="text-left text-[#999999]">
              <th className="p-4">{t('id', language)}</th>
              <th>{t('profile_id', language)}</th>
              <th>{t('start_date', language)}</th>
              <th>{t('end_date', language)}</th>
              <th>{t('type', language)}</th>
              <th>{t('payment_method', language)}</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  {t('no_subscriptions', language)}
                </td>
              </tr>
            ) : (
              filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="text-left border-b border-[#ADADAD] last:border-none text-sm">
                  <td className="p-4 font-medium">{sub.id}</td>
                  <td>{sub.profile_id}</td>
                  <td>{sub.start_date}</td>
                  <td>{sub.end_date}</td>
                  <td>{sub.type}</td>
                  <td>{sub.payment_method}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="text-sm text-gray-500 mt-4 text-center">
        {filteredSubscriptions.length} / {subscriptions.length} {t('subscriptions', language)}
      </div>
    </div>
  );
}