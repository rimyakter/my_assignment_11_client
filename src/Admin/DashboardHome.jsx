import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBoxOpen, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Fetch payments for the payment history table
  const {
    data: payments,
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data.filter((p) => p.status === "paid");
    },
  });

  // Fetch products for total products stat
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
      return res.data;
    },
  });

  if (paymentsLoading || productsLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (paymentsError || productsError)
    return (
      <p className="text-center text-red-500 py-6">
        Failed to load data from the server.
      </p>
    );

  // Filter orders for today
  const today = new Date();
  const ordersToday = payments?.filter((p) => {
    const orderDate = new Date(p.date || p.timestamp);
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  });

  // Stats dynamically calculated
  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: products?.length || 0,
      icon: <FaBoxOpen className="text-3xl text-white" />,
      bg: "bg-blue-500",
    },
    {
      id: 2,
      title: "Orders Today",
      value: ordersToday?.length || 0, // ✅ real orders today
      icon: <FaShoppingCart className="text-3xl text-white" />,
      bg: "bg-green-500",
    },
    {
      id: 3,
      title: "Total Orders",
      value: payments?.length || 0, // ✅ total orders all-time
      icon: <FaDollarSign className="text-3xl text-white" />,
      bg: "bg-yellow-500",
    },
  ];

  // Pagination for payments table
  const totalPages = Math.ceil(payments?.length / itemsPerPage) || 1;
  const paginatedPayments = payments?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`flex items-center p-6 rounded-xl shadow-lg ${stat.bg} text-white`}
          >
            <div className="p-4 bg-white/20 rounded-full">{stat.icon}</div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment History Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Payment History</h2>
        <div className="overflow-x-auto">
          {paginatedPayments?.length === 0 ? (
            <p className="text-center text-gray-600 py-6">No payments yet.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-900">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                    Buyer
                  </th>
                  <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPayments.map((p, i) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.productName ?? "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.buyerName ?? "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.quantity ?? "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{`$${
                      p.total?.toLocaleString() ?? 0
                    }`}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.date
                        ? new Date(p.date).toLocaleString()
                        : p.timestamp
                        ? new Date(p.timestamp).toLocaleString()
                        : "-"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 p-4 border-t">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
