import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCreditCard } from "react-icons/fa";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch order/payment info using TanStack Query
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", paymentId],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${paymentId}`
      );
      return res.data;
    },
    enabled: !!paymentId,
  });

  // Handle Stripe payment submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Determine total and quantity for cart or single order
      const total = order?.total ?? order?.totalAmount ?? 0;
      const quantity =
        order?.quantity ??
        order?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) ??
        0;

      // Create Payment Intent
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          amount: total * 100, // Stripe expects cents
          currency: "usd",
          orderId: order._id,
        }
      );

      const clientSecret = data.clientSecret;
      const card = elements.getElement(CardElement);

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: order?.buyerName,
              email: order?.buyerEmail,
            },
          },
        }
      );

      if (error) {
        setErrorMsg(error.message);
        console.error(error);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment successful!", paymentIntent);

        // Record payment in backend
        await axios.post(`${import.meta.env.VITE_API_URL}/payments`, {
          orderId: order._id,
          userId: order?.buyerEmail,
          productName:
            order?.productName ??
            (order?.items ? `Cart (${order.items.length} items)` : "Order"),
          quantity,
          total,
          method: "card",
          buyerName: order?.buyerName,
          buyerEmail: order?.buyerEmail,
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `You have paid $${total.toLocaleString()}`,
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/history/:email"); // Redirect to history page
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Payment failed. Try again.");
    }

    setLoading(false);
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "'Inter', sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": { color: "#a0aec0" },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load payment info.</p>
    );

  // Safely compute values for display
  const total = order?.total ?? order?.totalAmount ?? 0;
  const quantity =
    order?.quantity ??
    order?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) ??
    0;
  const productName =
    order?.productName ??
    (order?.items ? `Cart (${order.items.length} items)` : "Order");

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-sm p-6 mt-12 mb-12 border border-gray-100">
      <h2 className="text-xl md:text-2xl font-semibold text-center flex items-center justify-center mb-6 text-gray-900">
        <FaCreditCard className="w-6 h-6 text-primary mr-2" /> Complete Your
        Payment
      </h2>

      {/* Order Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6 text-gray-700">
        <h3 className="font-semibold text-lg mb-2">{productName}</h3>
        <p className="text-sm">Buyer: {order?.buyerName}</p>
        <p className="text-sm">Quantity: {quantity}</p>
        <p className="text-sm">
          Price per unit: ${quantity ? (total / quantity).toFixed(2) : 0}
        </p>
        <p className="font-semibold text-primary mt-2 text-lg">
          Total: ${total.toLocaleString()}
        </p>
      </div>

      {/* Stripe Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="border rounded-lg p-3 bg-gray-50">
          <CardElement options={cardStyle} />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 text-white text-lg font-medium rounded-lg transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#EB5E28] to-[#ff7f50] hover:opacity-90 shadow-md"
          }`}
        >
          {loading ? "Processing..." : `Pay $${total.toLocaleString()}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
