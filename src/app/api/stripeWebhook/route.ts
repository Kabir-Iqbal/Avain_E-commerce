import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from '@sanity/client'
import { headers } from "next/headers";
import { error } from "console";





const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31'
})


export async function POST(req : NextRequest) {
      const body = await req.text();
      const headerslist = await headers();
      const sig = headerslist.get("stripe-signature");

      

      if (!sig) {
        return NextResponse.json({error : "no-signature"}, {status : 400})
      }

      const webhooksecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhooksecret) {
        console.log("stripe webhook secret is not set");
        return NextResponse.json(
          {error : "stripe webhook secret is not set"},
           {status : 400}
          )
      }

      let event : Stripe.Event;
      try {
        event = stripe.webhook.constructEvent(body,sig, webhooksecret)
      } catch (error) {
          console.log("Webhook signature is not set");
          return NextResponse.json({error : `Webhook error, ${error} `} ,{status : 400})
      }
      
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(paymentIntent);
        
  
        // ✅ User Data نکالیں
        const orderId = paymentIntent.id;  // Payment ID (Order ID کے طور پر)
        const amount = paymentIntent.amount / 100;  // Amount in USD
        const userId = paymentIntent.metadata.userId || "No User ID"; 
        const userName = paymentIntent.metadata.userName || "Guest";
        const userEmail = paymentIntent.metadata.userEmail || "xyz@gmail.com"
        const status = paymentIntent.status

        try {
          const order = await client.create({
            _type: 'order',
            orderId: orderId,
            amount: amount,
            userId: userId,
            userName: userName,
            userEmail: userEmail,
            status: status,
          });
          console.log('✅ Order saved to Sanity:', order);
        } catch (error : any) {
          console.error("❌ Error saving order to Sanity:", error.message);
        }
        
        console.log("✅ Payment Successful!");
        console.log("📌 Order ID:", orderId);
        console.log("📌 Amount:", amount, "USD");
        console.log("📌 User ID:", userId);
        console.log("📌 User Name:", userName);
        console.log("userEmail", userEmail)
  
        // 📝 Database میں Save کریں (اگر ضروری ہو)
      }
  
      return NextResponse.json({ received: true });

    } 
  




// export async function POST(req: Request) {
//   console.log("📢 Webhook Received!");
//   const rawBody = await req.text();
//   console.log("🔹 Raw Webhook Body:", rawBody);
//   console.log("🔹 Headers:", req.headers);

//   // const event = stripe.webhooks.constructEvent(
//   //   rawBody,
//   //   sig!,
//   //   process.env.STRIPE_WEBHOOK_SECRET!
//   // );

//   return NextResponse.json({ message: "Webhook received!" });
  
// }





// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
//   apiVersion: '2021-08-31'
// });



// export async function POST(req: Request) {
//     const rawBody = await req.text(); 
//     const sig = req.headers.get("stripe-signature");
  
//     try {
//       // ✅ Webhook سے Event نکالیں
//       const event = stripe.webhooks.constructEvent(     //security function method 
//         rawBody,
//         sig!,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );
  
//       if (event.type === "payment_intent.succeeded") {
//         const paymentIntent = event.data.object as Stripe.PaymentIntent;
  
//         // ✅ User Data نکالیں
//         const orderId = paymentIntent.id;  // Payment ID (Order ID کے طور پر)
//         const amount = paymentIntent.amount / 100;  // Amount in USD
//         const userId = paymentIntent.metadata.userId || "No User ID"; 
//         const userName = paymentIntent.metadata.userName || "Guest";
//         const userEmail = paymentIntent.metadata.userEmail || "xyz@gmail.com"
//         const status = paymentIntent.status

//         try {
//           const order = await client.create({
//             _type: 'order',
//             orderId: orderId,
//             amount: amount,
//             userId: userId,
//             userName: userName,
//             userEmail: userEmail,
//             status: status,
//           });
//           console.log('Order saved to Sanity:', order);
//         } catch (error) {
//           console.error("Error saving order to Sanity:", error);
//         }
//         console.log("✅ Payment Successful!");
//         console.log("📌 Order ID:", orderId);
//         console.log("📌 Amount:", amount, "USD");
//         console.log("📌 User ID:", userId);
//         console.log("📌 User Name:", userName);
//         console.log("userEmail", userEmail)
  
//         // 📝 Database میں Save کریں (اگر ضروری ہو)
//       }
  
//       return NextResponse.json({ received: true });
//     } catch (err) {
//       console.error("❌ Webhook Error:", err);
//       return NextResponse.json({ error: "Webhook error" }, { status: 400 });
//     }
//   }


  