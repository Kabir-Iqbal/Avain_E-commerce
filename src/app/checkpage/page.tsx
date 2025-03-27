"use client";
import { useAppSelector } from "../lib/store/hooks";


import Image from "next/image";
import { client } from "@/sanity/lib/client";
import dynamic from "next/dynamic";

const StripePayment = dynamic(() => import("../components/stripePayment"), {
  ssr: false, // Disable SSR for this component
});


const CheckOut = () => {
  
     const amount = useAppSelector((state) => state.amount.totalAmount);
    const filteredProducts = useAppSelector(state => state.products.filteredProducts)
    
  return (
    <div className="w-[100%] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row bg-gray-100 sm:p-6 md:p-7 rounded-xl shadow-xl">
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-600 my-5 mx-6">TEST MODE</p>
          <div className="w-[88%] md:w-[95%] lg:w-[85%] mx-auto">
           
                <div className="mb-8">
                  <div className="border-b-2 pb-5 mb-6">
                    <p className="text-xl font-semibold text-gray-700">Pay</p>
                    <p className="text-2xl font-bold text-black">{`$${amount}.00`}</p>
                  </div>
                  
                  {filteredProducts
                    //  .filter((checkitem: any) => checkitem.product && checkitem.product.length > 0)
                    .map((checkitem: any, indx: number) => {
                    
                      return(        
                    <div key={indx}
                      className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-5"
                    
                    >
                      <div className="flex gap-4 items-center">
                        <Image width={60} height={60} src={checkitem.image} alt={checkitem.name} className="rounded-md" />
                        <h2 className="text-[12px] sm:text-[15px] md:text-lg text-gray-800 font-semibold">{checkitem.name}</h2>
                      </div>
                      <p className="text-[12px] sm:text-[15px] md:text-lg lg:text-xl font-medium text-black">
                        {checkitem.quantity}
                      </p>
                      <p className="text-[12px] sm:text-[15px] md:text-lg lg:text-xl font-medium text-black">
                        {`$${checkitem.price}.00`}
                      </p>
                    </div>
                   )})}
                </div>
                    
             
          </div>
        </div>
        <div className="flex-1">
          <StripePayment />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
