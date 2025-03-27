'use client'
import { useEffect, useState } from 'react';
import convertToSubCurrency from './ConvertToSubCurrency';
import StripeCheck from './stripeCheck';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// getting total amount from redux
import { useAppSelector } from '../lib/store/hooks';
import React from 'react';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);    //key for frontend

// this is like CheckOuut
const StripePayment = () => {

    const amount = useAppSelector((state) => state.amount.totalAmount);

    //  const amount = 99.79
  return (
    <div>
         <Elements 
                stripe={stripePromise}     //"stripe promise is key"
                options={{
                    mode: 'payment',
                    amount: convertToSubCurrency(amount),
                    currency: 'usd',
                 
                }}
            >
                <StripeCheck amount={amount} />
            </Elements>

         
    </div>
  ) 
}

export default StripePayment
