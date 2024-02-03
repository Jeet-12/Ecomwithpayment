import { instance } from "./index.js";
import crypto from "crypto";

export const checkout = async (req, res) => {

  var options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",

  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json({
    success: true,
    order,
  })
}


export const paymentverification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  razorpay_payment_id + "|" + razorpay_order_id
  const sha = crypto.createHmac('sha256',process.env.key_secret)
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
  const digest = sha.digest("hex");

  if(digest !== razorpay_signature){
    return res.status(400).json({msg:"Transaction is not legit !"})
  }
  else{
  res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
  }
  // const generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, process.env.key_secret);
  // console.log(generated_signature);
  // console.log(razorpay_signature);
  // // if (generated_signature == razorpay_signature) {
  // //   console.log("success");
  // // }
  
}
