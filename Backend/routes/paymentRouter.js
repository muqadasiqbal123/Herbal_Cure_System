import express from "express";
const paymentRouter = express.Router();
import appointmentModel from "../models/appointmentModel.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

paymentRouter.post("/process", async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "USD",
    metadata: {
      company: "Herbal-cure-system",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

paymentRouter.get("/stripeapikey", async (req, res, next) => {
  if (!process.env.STRIPE_API_KEY) {
    return next(new ErrorHandler("No Stripe API Keys found", 404));
  }
  res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
});

paymentRouter.post("/update-appointment/:id", async (req, res, next) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing paymentIntentId" });
  }
  try {
    // Fetch the PaymentIntent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if payment was successful
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message:
          "Payment not successful. Current status: " + paymentIntent.status,
      });
    }

    const appointment = await appointmentModel.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    appointment.payment = true;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Failed to verify payment and update appointment",
      error: error.message,
    });
  }
});

export default paymentRouter;
