import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PaymentHistory = () => {
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/payments`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to load payment history.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Payment History
      </h2>

      {payments?.length === 0 ? (
        <p className="text-center text-gray-500">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">Product</th>
                <th className="px-4 py-2 border text-center">Quantity</th>
                <th className="px-4 py-2 border text-right">Amount</th>
                <th className="px-4 py-2 border text-left">Buyer</th>
                <th className="px-4 py-2 border text-center">Status</th>
                <th className="px-4 py-2 border text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 border">{p.productName ?? "-"}</td>
                  <td className="px-4 py-2 border text-center">
                    {p.quantity ?? "-"}
                  </td>
                  <td className="px-4 py-2 border text-right">
                    ${p.total?.toLocaleString() ?? 0}
                  </td>
                  <td className="px-4 py-2 border">{p.buyerName ?? "-"}</td>
                  <td className="px-4 py-2 border text-center">
                    {p.status ?? "-"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {p.timestamp ? new Date(p.timestamp).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
