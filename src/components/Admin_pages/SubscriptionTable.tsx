import { Subscription } from "./types";

type Props = {
  subscriptions: Subscription[];
};

export default function SubscriptionTable({ subscriptions }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-[#ADADAD]">
          <tr className="text-left text-[#999999]">
            <th className="p-4">Username</th>
            <th>Email</th>
            <th>Total Amount</th>
            <th>Started At</th>
            <th>Next Billing Date</th>
          </tr>
        </thead>

        <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  No subscription yet
                </td>
              </tr>
            ) : (
                subscriptions.map((sub) => (
                    <tr key={sub.id} className=" text-left border-b border-[#ADADAD] last:border-none text-sm">
                    <td className="p-4 font-medium">{sub.username}</td>
                    <td>{sub.email}</td>
                    <td>${sub.amount.toFixed(2)}</td>

                    <td>
                        <div className="flex flex-col text-sm space-y-0">
                        <div className="flex gap-1">
                            <span className="text-[#9F9F9F] ">Date:</span>
                            <span className="text-gray-700">{formatDate(sub.startedAt)}</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-[#9F9F9F] ">Time:</span>
                            <span className="text-gray-700">{formatTime(sub.startedAt)}</span>
                        </div>
                        </div>
                    </td>

                    <td>
                        <div className="flex flex-col text-sm space-y-0">
                        <div className="flex gap-1">
                            <span className="text-[#9F9F9F] ">Date:</span>
                            <span className="text-gray-700">{formatDate(sub.nextBillingDate)}</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-[#9F9F9F] ">Time:</span>
                            <span className="text-gray-700">{formatTime(sub.nextBillingDate)}</span>
                        </div>
                        </div>
                    </td>

                    </tr>
                ))
            )}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.toDateString()}`;
}

function formatTime(date: string) {
  const d = new Date(date);
  return `${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
