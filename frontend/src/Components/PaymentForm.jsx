import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { amount, _id } = useParams();
  const navigate = useNavigate();
  const [cardHolder, setCardHolder] = useState("");

  const updateAppointmentAsPaid = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/update-appointment/${_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        navigate("/my-appointments");
      }
    } catch (error) {
      alert("Failed to update appointment.");
      console.error("Error updating appointment:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/process`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
        }
      );

      const { client_secret } = await response.json();
      if (!client_secret) throw new Error("Failed to get payment intent.");

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: cardHolder,
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        updateAppointmentAsPaid();
      }
    } catch (error) {
      alert("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Payment Gateway
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Holder Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Card Holder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Card Number Field */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Card Number</label>
            <div className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
              <CardNumberElement className="w-full" />
            </div>
          </div>

          {/* Expiry Date & CVC Fields */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-600">Expiry Date</label>
              <div className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
                <CardExpiryElement className="w-full" />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-600">CVC</label>
              <div className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300">
                <CardCvcElement className="w-full" />
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Pay $${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
