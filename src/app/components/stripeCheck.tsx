'use client'
import { useState, useEffect } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubCurrency from './ConvertToSubCurrency'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '../lib/store/hooks'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon for the loader


const StripeCheck = ({ amount }: { amount: number }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setError] = useState<string>()
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(true)
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'Processing...' | 'Successed'>('idle')

    
    const [userId, setUserId] = useState('')
    const [userName , setUserName] = useState('')
    const [userEmail , setUserEmail]=  useState('')

    const [URL, setURL] = useState('');

    const router = useRouter(); // ✅ Next.js router


    useEffect(() => {
        setUserId(uuidv4());
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setURL(window.location.host === 'localhost:3000'
                ? 'http://localhost:3000'
                : 'https://avain-e-commerce.vercel.app');
        }
    }, []);

    // getting products Data from Redux
    const Products = useAppSelector(state => state.products.filteredProducts)

    console.log("📩 Sending API request with:", { userId, userName, userEmail });


    useEffect(() => {
        // if (!userId.trim() || !userName.trim() || !userEmail.trim()) return;
        if (!clientSecret ) {
            fetch('/api/payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: convertToSubCurrency(amount),
                    userId,
                    userName,
                    userEmail,
                    Data: Products,
                    paymentStatus
                })
            })
                .then(res => res.json())
                .then(data => {
                    setClientSecret(data.clientSecret);
                    sessionStorage.setItem('paymentIntentId', data.paymentintentId);   // save OrderId in session storage through the client component
                    setLoading(false);
                })
                .catch(error => {
                    setError('Failed to fetch client secret');
                    setLoading(false);
                });
        }

    }, [userId, userName, userEmail, Products, clientSecret]);  // ✅ جب تینوں ویلیوز سیٹ ہوں تبھی API کال ہو۔


   
    // const fetchClientSecret = async () => {
    //     if (clientSecret) return;

    //     try {
    //         const response = await fetch('/api/payment-intent', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 amount: convertToSubCurrency(amount),
    //                 userId,
    //                 userName,
    //                 userEmail,
    //                 Data: Products,
    //                 paymentStatus
    //             })
    //         });

    //         if (!response.ok) {
    //             setError('Failed to fetch client secret');
    //             return;
    //         }

    //         const data = await response.json();
    //         setClientSecret(data.clientSecret);
    //         sessionStorage.setItem('paymentIntentId', data.paymentintentId);   // save OrderId in session storage through the client component
    //     } catch (error) {
    //         setError('Failed to fetch client secret');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // useEffect(() => {
    //     if (userId.trim() && userName.trim() && userEmail.trim()) {
    //         fetchClientSecret();
    //     }
    // }, [userId, userName, userEmail]);
    
 

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     if (!stripe || !elements) {
    //         setError("Stripe or elements are not yet initialized.")
    //         return
    //     }

    //     setPaymentStatus('Processing...')
    //     const { error: submitErrors } = await elements.submit()
    //     if (submitErrors) {
    //         setError(submitErrors.message)
    //         setPaymentStatus('idle')
    //         return
    //     }

    //     const { error } = await stripe.confirmPayment({
    //         elements,
    //         clientSecret,
    //         confirmParams: {
    //             return_url: `${URL}/payment-success?amount=${amount}`
    //         },
    //         redirect: "if_required"
    //     })

    //     if (error) {
    //         setError(error.message);
    //         setPaymentStatus('idle');
    //     } else {
    //         setError('');
    //         setPaymentStatus('Successed');
    //         setTimeout(() => {
    //             router.push(`${URL}/payment-success?amount=${amount}`); // ✅ Next.js ka `router.push()` use kiya hai
    //         },);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            setError("Stripe or elements are not yet initialized.");
            return;
        }
    
        if (!clientSecret) {
            setError("Payment cannot be processed at the moment. Please try again later.");
            return;
        }
    
        setPaymentStatus('Processing...');
        const { error: submitErrors } = await elements.submit();
        if (submitErrors) {
            setError(submitErrors.message);
            setPaymentStatus('idle');
            return;
        }
    
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${URL}/payment-success?amount=${amount}`
            },
            redirect: "if_required"
        });
    
        if (error) {
            setError(error.message);
            setPaymentStatus('idle');
        } else {
            setError('');
            setPaymentStatus('Successed');
            setTimeout(() => {
                router.push(`${URL}/payment-success?amount=${amount}`);
            }, 500);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className='p-8'>
            {loading ? (
                <div className="flex justify-center items-center mt-10">
                   <FaSpinner className="animate-spin text-teal-500" size={30} />
                </div>
            ) : (
                <>
                    {clientSecret && <PaymentElement />}

                    <div className="mb-4 mt-1 ">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder='Enter your name.'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder='Enter your email.'
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)} 
                            required
                        />
                    </div>

                    <button type='submit' className={`w-full py-2 mt-5 ${paymentStatus === 'Successed' ? 'bg-green-600' : 'bg-[#2a254b]'} text-white`}
                        disabled={paymentStatus === 'Processing...' || paymentStatus === 'Successed'}>
                        {paymentStatus === 'Processing...' ? (
                            <div className='w-full flex justify-between items-center'>
                                <p className='flex-1 text-center'>Processing...</p>
                                <AiOutlineLoading3Quarters className="px-1 animate-spin text-lg" />
                            </div>
                        ) : paymentStatus === 'Successed' ? 'Successed' : ' Pay Now'}
                    </button>
                </>
            )}
        </form>
    )
}

export default StripeCheck
