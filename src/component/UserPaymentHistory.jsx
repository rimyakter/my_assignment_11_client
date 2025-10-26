import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaMoneyBillWave,
  FaDollarSign,
  FaCalendarAlt,
  FaHashtag,
  FaShoppingCart,
  FaEnvelope,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const UserPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userPayments", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/payments`);
      return res.data.filter(
        (p) => p.status === "paid" && p.buyerEmail === user.email
      );
    },
    enabled: !!user?.email,
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
        Failed to load your payment history.
      </p>
    );

  const totalPayments = payments?.length || 0;
  const totalPages = Math.ceil(totalPayments / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <FaMoneyBillWave className="text-2xl md:text-3xl text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Payment History
          </h2>
        </div>
        <p className="text-gray-600 text-sm">
          View all your completed transactions and payment details.
        </p>
      </div>

      {payments?.length === 0 ? (
        <p className="text-center text-gray-600 bg-white py-6 rounded-lg shadow">
          No payments yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
            <table className="min-w-full border-collapse table-auto text-sm text-gray-800">
              <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Product
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-center">
                    Qty
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-right">
                    Amount
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Buyer Name
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-left">
                    Buyer Email
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-center">
                    Status
                  </th>
                  <th className="px-4 py-3 border-b border-gray-200 text-center">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((p, idx) => (
                  <tr
                    key={p._id}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-2 font-medium">
                      {p.productName ?? "-"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {p.quantity ?? "-"}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-gray-800">
                      ${p.total?.toLocaleString() ?? 0}
                    </td>
                    <td className="px-4 py-2">{p.buyerName ?? "-"}</td>
                    <td className="px-4 py-2">{p.buyerEmail ?? "-"}</td>
                    <td className="px-4 py-2 text-center">
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
                    <td className="px-4 py-2 text-center">
                      {p.timestamp
                        ? new Date(p.timestamp).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 text-sm rounded border border-gray-300 ${
                  currentPage === i + 1
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPaymentHistory;
