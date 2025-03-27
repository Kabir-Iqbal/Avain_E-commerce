import { createClient } from "next-sanity";
import { NextResponse, NextRequest } from "next/server";


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Create Sanity client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2021-08-31'
})


export async function POST(request: NextRequest) {

    try {
        const { amount, userId, userName, userEmail, Data, paymentStatus} = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({     //built in methoth of stype is "paymentintent.create"
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            // automatic_payment_methods: ['card_present'], 
            metadata: {
                userName: userName,   // Default values if not passed
                userId: userId,
                userEmail: userEmail, // Default email
            }
        })

        //    // ✅ پہلے چیک کریں کہ کیا یہ order پہلے سے Sanity میں موجود ہے؟
        //    const existingOrder = await client.fetch(
        //     `*[_type == "order" && userId == $userId][0]`,  
        //     { userId }
        // );

        // if (existingOrder) {
        //     alert("⚠️ Order already exists in Database:");
        //     return NextResponse.json({ message: "Order already exists", order: existingOrder });
        // }

        console.log("Username " , userName);
        console.log("Username " , userEmail);
        
         
        if (userId ) {
            // const confirmPaymentStatus = await stripe.paymentIntent.confirm(paymentIntent.id)
        // ✅ Order Data for Sanity
        const orderData = {
            _type: "order",
            orderId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            userId : userId,
            userName : userName,
            userEmail : userEmail,
            status: paymentStatus,
            orderDate : new Date().toISOString().split("T")[0],
            // ✅ Complete product data store کر رہے ہیں
            items: Data.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: item.quantity
            }))
        
        }
        

        try {
            const sanityOrder = await client.create(orderData);
        } catch (error) {
            console.log("Failed to save order into sanity", error);

        }
    } else ("Failed to save order in sanity ")
    
    


        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            status: paymentIntent.status,
            paymentintentId : paymentIntent.id
           
        })
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({
                status: 500,
                body: { error: err.message }
            })
        }
    }
}

