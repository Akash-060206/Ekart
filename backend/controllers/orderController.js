import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


// Placing Orders using COD

const placeOrder = async (req, res) => {
     try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Stripe

const placeOrderStripe = async (req, res) => {
 
}

// Placing orders using RazorPay

const placeOrderRazorpay = async (req, res) => {
     try {
    const { userId, items, amount, address } = req.body;

    // Save order in DB (payment = false)
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Create Razorpay order
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: newOrder._id.toString()
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Send details to frontend
    res.json({
      success: true,
      razorpayOrder,
      orderId: newOrder._id
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Verify Razorpay payment 
const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    // Mark order as paid
    await orderModel.findByIdAndUpdate(orderId, { payment: true });

    res.json({ success: true, message: "Payment verified" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All order data for admin panel

const allOrders = async (req, res) => {
  
}

// User order data for frontend

const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Updata order status from Admin panel

const updateStatus = async (req, res) => {
   
}

export { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders,verifyRazorpay};