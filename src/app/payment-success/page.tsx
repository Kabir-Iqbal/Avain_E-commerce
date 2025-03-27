"use client";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been confirmed.</p>

        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={() => router.push("/order")}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            View Order
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
