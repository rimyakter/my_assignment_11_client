import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaMoneyBillWave } from "react-icons/fa";

const PaymentHistory = () => {
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/payments`);
      // ✅ Only include items that are paid
      return res.data.filter((p) => p.status === "paid");
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
    <div className="w-11/12 mx-auto my-12 ">
      {/* ✅ Title Section */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3 mb-3">
          <FaMoneyBillWave className="text-xl md:text-3xl text-primary" />
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Payment History
          </h2>
        </div>
        <p className="text-gray-600 text-sm">
          View all your completed transactions and payment details.
        </p>
      </div>

      {/* ✅ Table Section */}
      {payments?.length === 0 ? (
        <p className="text-center text-gray-600 bg-white py-8 rounded-lg shadow">
          No payments yet.
        </p>
      ) : (
        <div className="overflow-x-auto  rounded-sm shadow-sm border border-gray-50">
          <table className="w-full  text-sm text-gray-900">
            <thead className="  uppercase text-xs tracking-wider">
              <tr>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-center">Quantity</th>
                <th className="px-5 py-3 text-right">Amount</th>
                <th className="px-5 py-3 text-left">Buyer</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => (
                <tr
                  key={p._id}
                  className={`border-t hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-5 py-3 font-medium">
                    {p.productName ?? "-"}
                  </td>
                  <td className="px-5 py-3 text-center">{p.quantity ?? "-"}</td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-800">
                    ${p.total?.toLocaleString() ?? 0}
                  </td>
                  <td className="px-5 py-3">{p.buyerName ?? "-"}</td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status ?? "-"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
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
