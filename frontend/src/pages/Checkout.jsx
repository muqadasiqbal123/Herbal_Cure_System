import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../Components/PaymentForm';


const PUBLISH_KEY=import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(PUBLISH_KEY);

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <PaymentForm />
      </div>
    </Elements>
  );
};

export default Checkout;