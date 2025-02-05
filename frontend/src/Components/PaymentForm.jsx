import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { amount, _id } = useParams();
  const navigate = useNavigate();


  const updateAppointmentAsPaid = async() => {
    try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/payment/update-appointment/${_id}`,
      {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

      if (response.ok) {
        navigate("/my-appointments");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    setIsProcessing(true);

    try {
      // Fetch the client_secret from your backend
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/payment/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }), //  amount in cents ($50.00)
        }
      );

      const { client_secret } = await response.json();

      // Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        alert("Payment Successfull!");
        updateAppointmentAsPaid();
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <CardElement/> */}

      <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-6 bg-primary rounded-full">
          <p className="text-white text-lg font-bold">P</p>
        </div>
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Payment Gateway
        </h2>
        <div className="space-y-4">
          {/* Card Holder */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Card holder:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 border-gray-300"
              placeholder="Coding Market"
            />
            <i className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 fas fa-user"></i>
          </div>
          {/* Card Number */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Card number:
            </label>
            <input
              type="text" 
              className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 border-gray-300"
              placeholder="Card Number"
            />
            <i className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 far fa-credit-card"></i>
          </div>
          {/* Expiry and CVC */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Expiry date:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 border-gray-300"
                placeholder="MM / YY"
              />
              <i className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 far fa-calendar-alt"></i>
            </div>
            <div className="relative flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                CVC:
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 border-gray-300"
                placeholder="000"
              />
              <i className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 fas fa-lock"></i>
            </div>
          </div>
          {/* Pay Button */}
          <div>
            <button className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* <button>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button> */}
    </form>
  );
};

export default PaymentForm;
