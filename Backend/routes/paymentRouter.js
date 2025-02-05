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


paymentRouter.post('/update-appointment/:id', async (req, res, next) => {
    try {
        const appointment = await appointmentModel.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        appointment.payment = true;
        await appointment.save();

        res.status(200).json({
            success: true,
            message: 'Payment status updated successfully'
        });
    } catch (error) {
        return res.status(200).json({success:false,message:"Failed to update the appointment"})
    }
});


export default paymentRouter;



