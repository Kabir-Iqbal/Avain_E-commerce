"use client"

// import { Product } from "../Data/product";

import { useAppSelector } from "../lib/store/hooks";
import { remove } from "../lib/store/feature/cart/CartSlice";
import { useAppDispatch } from "../lib/store/hooks";

import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

//  redux manage total amount
import { addTotalAmount } from "../lib/store/feature/amount/AmountSlice";
import {SetFilteredProducts} from "../lib/store/feature/product/ProductSlice"




function Cart() {

  //storing data
  const [Data, setData] = useState([])

  //import data from sanity
  useEffect(() => {
    const fetchProducts = async () => {

      try {
      const data = await client.fetch(`*[_type == "product"] {
                category,
                name,
                slug,
                "image" : image.asset->url,
                price,
                quantity,
                tags,
                description,
                features,
                dimensions,
                }`)

      setData(data)
    } catch (error) {
      return <div> <p>Failed to fetch </p> console.log(error);
      </div>
      
  }
    }

    fetchProducts()

  }, [])

  const Product: any = Data
  const data = useAppSelector(state => state.cart.item)

  const filteredProducts = Product.map((product: any) => {
                            //  Cart item slug                          product slug
    const matchingCartItem = data.find(cartItem => cartItem.slug === product.slug.current);   
    return matchingCartItem 
    ? { ...product, quantity: matchingCartItem.quantity }  // matched product with quantity
    : null;
}).filter(Boolean);  // null values کو remove کرنے کے لیے


   const dispatch = useAppDispatch()

   if (filteredProducts.length > 0) {
     const simplifiedProducts : any = filteredProducts.map((product: any) => ({
        name: product.name,
        image: product.image,
        price : product.price,
        quantity : product.quantity
      }));

      console.log("Dispatching products: ", simplifiedProducts);
      dispatch(SetFilteredProducts(simplifiedProducts)); // Dispatch to Redux store
   }


   
  // Total amount
  const totalAmount = filteredProducts.reduce((sum: any, product: any, index: any) => {
    return (sum + product.price * product.quantity)

  }, 0)

  
  
  
  const HandletoRemove = (productslug: string) => {
    dispatch(remove(productslug))
  }
  

    // add total amount to redux 
    dispatch(addTotalAmount(totalAmount))
    

  if (!Data) {
    return <div>
      Loading...
    </div>
  }

  return (
    <>
      <div className=" max-w-[1440px] mx-auto w-[100%] " >
        {/* Header */}
        <Header />

        {/* Cart data */}
        <div className="min-h-[749px] bg-[#F9F9F9] " >
          <div className=" w-[90%] md:w-[85%] h-full mx-auto pt-[200px] " >
            <h1 className=" text-[36px] leading-[50.4px] font-Clash  " >Your shopping cart</h1>
            <div className=" hidden text-[18px] md:text-[20px] w-[85%] md:w-[90%] lg:w-[92%] md:flex justify-between font-Clash text-[#2A254B] mt-[20px] " >
              <p>Product</p>
              <p >Quantity</p>
              <p>Total</p>
            </div>
            {/* <h1>
               ProductId == {filteredProducts.length}
           </h1> */}
            <div>
              {filteredProducts.map((product: any, index: any) => {

                




                return (
                  <div key={product.id} className="flex gap-1 md:gap-2 mt-8 mb-24 md:my-5 " >
                    
                    <div className="flex w-[85%] md:w-[90%] lg:w-[92%]  " >
                    <hr className="text-[#EBE8F4] my-5 " />
                    <div className=" h-[60px] md:h-[134px] grid grid-cols-5  md:grid-cols-4 w-full  sm:gap-5 md:gap-1" >

                      <div className=" h-[100px] md:h-[134px] col-span-3 md:col-span-2 w-full flex gap-2  " >
                        <Image className=" h-[90px] md:h-full  w-[80px] md:[150px] lg:w-[190px] " src={product.image} alt={product.name} width={200} height={100} />

                        <div className="my-5 flex flex-col justify-between text-[#2A254B] " >
                          <h2 className=" text-[13px] md:[18px] lg:text-[20px] leading-[28pxx] font-Clash " >{product.name} </h2>
                          <h3 className=" text-[13px] sm:text-[16px] leading-[24px] " > {`$${product.price}`}</h3>
                        </div>
                      </div>

                      <div className="flex h-full flex-col text-center md:text-start " >
                        <h1 className="  mt-5   " >{product.quantity } </h1>
                      </div>


                      <h1 className=" text-end mt-5" > {`$${product.quantity * product.price} `} </h1>


                    </div>
                    </div>
                    

                    <div>  <button className=" text-[14px] ml-2 md:ml-3 mt-5 bg-red-700 text-white px-1 py-[1px] sm:px-2 sm:py-[2px] rounded-lg  " onClick={() => HandletoRemove(product.slug.current)} > Delete </button> </div>
                  </div>
               

                )
              })}

              <div className="my-9" >
                <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-0  " >
                  <p className="order-2 md:order-1 text-[#2A254B] text-sm sm:text-[14px] text-end md:text-start " >Taxes and shipping are calculated at checkout</p>

                  <div className="order-1 md:order-2" >
                    <p className=" text-end md:text-start text-[20px] text-[#4E4D93] mx-5 " >Subtotal <span className=" mr-1 text-[24px] " >  {`$${totalAmount}`}</span> </p>
                  </div>

                </div>
                <Link href={'/checkpage'}>
                  <p className="text-end w-full " > <button className="bg-[#2A254B] w-full sm:w-[172px] my-4 px-7 py-3 md:my-2 mb-8   text-white " >Go to checkout </button> </p>
                </Link>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
export default Cart


