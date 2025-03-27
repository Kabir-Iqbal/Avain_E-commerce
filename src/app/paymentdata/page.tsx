'use client'
import { useState } from "react";

const StripePaymentComponent = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        clientSecret: '',
        amount: 0,
        status: '',
        paymentIntentId: ''
    });

    const handlePayment = async () => {
        // Assuming amount is set elsewhere
        const amount = 5000; // Example amount in cents

        const response = await fetch('/api/payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })
        });

        const data = await response.json();

        if (data.clientSecret) {
            // Update state with the fetched payment details
            setPaymentDetails({
                clientSecret: data.clientSecret,
                amount: data.amount,
                status: data.status,
                paymentIntentId: data.paymentIntentId
            });
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Create Payment</button>

            <div>
                <p>Payment Intent ID: {paymentDetails.paymentIntentId}</p>
                <p>Amount: {paymentDetails.amount}</p>
                <p>Status: {paymentDetails.status}</p>
                <p>Client Secret: {paymentDetails.clientSecret}</p>
            </div>
        </div>
    );
};

export default StripePaymentComponent;