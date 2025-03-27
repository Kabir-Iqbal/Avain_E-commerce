"use client"
import Header from "../components/header";
import Image from "next/image"
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCheckCircle } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { PiFlowerTulipLight } from "react-icons/pi";
import { ClipLoader } from "react-spinners";

import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

// imported Data 
// import { Product } from "../Data/product";


function Hero() {
    //storing data
     const [Data, setData] = useState([])
    
     //import data from sanity
        useEffect(()=> {
            const fetchProducts = async()=> {
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
               console.log(data);
               
                setData(data)
            } catch (error) {
                return <div> <p>Failed to fetch </p> console.log(error);
                </div>
                
            }
            }
            
            fetchProducts()        
    
        }, [])     
    
        
    
        if (!Data) {
            return <div>
                Loading...
            </div>
        }


        const Product: any = Data
        console.log("Products ",Product)

    return (

        <div className=" max-w-[1440px] mx-auto w-[100%] " >

            {/*Header  */}
            <Header />

            {/* hero-1 */}
            <div className=" flex pt-[132px] flex-col gap-10  w-[100%] md:w-[90%] mx-auto " >
                <div className="flex flex-col md:flex-row  text-white h-[502px] md:h-[480px]  ">
                    {/* left-section */}
                    <div className=" flex flex-col gap-14 md:gap-4 px-6 md:px-11 py-2 sm:py-4 md:py-7 bg-[#2A254B] h-full w-full md:w-[60%] " >
                        <div className=" order-1 md:order-1 text-center md:text-start " >
                            <p className="  font-Clash  mt-16 text-[32px] leading-[45px] md:text-2xl w-[90%] mx-auto md:mx-0   md:w-[70%]" >
                                The furniture brand for the future, with timeless designs</p>
                        </div>

                        <div className="order-3 md:order-2 mt-1 md:mt-0 ">
                            <Link href="/productListing" >
                                <button className="  block   px-3 w-[150px] mx-auto md:mx-0 py-2 text-sm bg-[#F9F9F926] ">  View collection </button></Link>
                        </div>

                        <div className="order-2 md:order-3 items-center px-3 sm:px-2 md:px-0  " >
                            <p className=" items-center  font-sans text-center md:text-start md:w-[90%]  sm:mt-6 md:mt-28 text-sm text-[#FFFFFF] h-[81px] " >
                                A new era in eco friendly furniture with Avelon, the French luxury retail brand
                                with nice fonts, tasteful colors and a beautiful way to display things digitally
                                using modern web technologies.
                            </p>
                        </div>

                    </div>

                    {/* right section */}
                    <div className=" hidden md:block h-full w-[40%] relative" >
                        <Image className="object-cover " fill src="/images/Right Image.png" alt="chairpic" />
                    </div>
                </div>

                {/* Cards  */}
                <div className="w-[97%] mx-auto mt-20 " >
                    <p className="font-Clash text-center text-[24px] w-[97%] mx-auto " >What makes our brand different</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4     justify-center gap-7 my-10 px-2 md:px-0  " >
                        <div className="  h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 " >
                            <TbTruckDelivery className="mb-2 text-2xl " />
                            <br />
                            <p className="font-Clash " >Next day as standard  </p>
                            <p className="text-sm mt-2 font-santoshi "> Order before 3pm and get your order the next day as standard</p>
                        </div>
                        <div className=" h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 "  >
                            <MdOutlineCheckCircle className="mb-2 text-2xl" />
                            <br />
                            <p className="font-Clash " >Made by true artisans </p>
                            <p className="text-sm mt-2 font-santoshi " >  Handmade crafted goods made with
                                real passion and craftmanship</p>
                        </div>
                        <div className=" h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 "  >
                            <FaRegCreditCard className="mb-2 text-2xl " />
                            <br />
                            <p className="font-Clash " >Unbeatable prices </p>
                            <p className="text-sm mt-1 font-santoshi "> For our materials and quality you won’t find better prices anywhere</p>
                        </div>
                        <div className=" h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 "  >
                            <PiFlowerTulipLight className="mb-2 text-2xl " />
                            <br />
                            <p className="font-Clash " >Recycled packaging </p>
                            <p className="text-sm mt-1 font-santoshi ">  We use 100% recycled packaging to ensure our footprint is manageable</p>
                        </div>
                    </div>
                </div>

                {/* HeroCards */}

                <div className="  mt-16 w-[90%] md:w-full mx-auto md:h-full  " >
                    <p className="text-2xl font-semibold text-[#2A254B] " >New ceramics</p>


                    {/* CardBox */}

{/* CardBox */}
{Product.length > 0 ? (
<div className="flex flex-wrap gap-3 md:gap-6 mt-6">
  <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-3 md:gap-5">
    
       {Product.slice(0, 4).map((product: any) => (
        <Link href={`${product.slug.current}`} key={product.id}>
          <div className="flex flex-col h-[375px] gap-4 bg-gray-100 shadow-sm shadow-black group cursor-pointer overflow-hidden">
            <div className="w-full mx-auto h-[80%] sm:h-[70%]">
              <Image
                className="w-full object-cover h-[180px] sm:h-[220px] md:h-72 group-hover:scale-105 duration-200 transition-transform"
                src={`${product.image}`}
                alt={`${product.name}`}
                width={300}
                height={150}
              />
            </div>

            <div className="text-sm gap-1 h-[20%] sm:h-[30%] text-[#2A254B] flex flex-col my-5 px-1">
              <p>{product.name}</p>
              <p>{`$${product.price}`}</p>
            </div>
          </div>
        </Link>
        ))}
        </div>
        </div>
    ) : (
        <div className="w-full  grid place-items-center my-20 ">
        <ClipLoader color="#4A90E2" size={30} />
      </div>
    )}
 

                </div>
               {Product.length > 0 &&(
                <Link href="/productlisting" >  <div className="flex justify-center mb-14 " >
                    <button className="px-3 py-2 border-[1px] border-slate-300 justify-center " > View collection </button>
                </div></Link>
                )}


{/* CardBox */}
<div className="mt-16 w-[90%] mx-auto md:w-full h-fit">
  <p className="text-2xl font-semibold text-[#2A254B]">New ceramics</p>

  {/* اگر پروڈکٹس لوڈ نہیں ہوئے تو اسپنر شو ہوگا */}
  {Product.length === 0 ? (
    <div className="flex gap-5 mt-6 mb-0 md:my-6 h-[450px]">
      <div className="flex-1  justify-center items-center bg-gray-100 shadow-sm shadow-black h-full w-[50%] hidden md:flex">
        <ClipLoader color="#4A90E2" size={40} />
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-3 h-full">
        <div className="flex justify-center items-center bg-gray-100 shadow-sm shadow-black h-full">
          <ClipLoader color="#4A90E2" size={40} />
        </div>
        <div className="flex justify-center items-center bg-gray-100 shadow-sm shadow-black h-full">
          <ClipLoader color="#4A90E2" size={40} />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex gap-5 mt-6 mb-0 md:my-6">
      <div className="flex-1 gap-3 h-[450px] hidden md:flex md:static flex-col w-[50%] bg-gray-100 shadow-sm shadow-black overflow-hidden group cursor-pointer">
        {Product.slice(0, 1).map((product2: any) => (
          <Link href={`${product2.slug.current}`} key={product2.id}>
            <div className="w-[100%] h-[85%] flex flex-nowrap">
              <Image
                className="w-full object-cover h-[180px] sm:h-[220px] md:h-[330px] group-hover:scale-105 duration-200 transition-transform"
                src={`${product2.image}`}
                alt={`${product2.name}`}
                width={455}
                height={200}
              />
            </div>
            <div className="text-sm gap-1 text-[#2A254B] flex flex-col my-3 px-1">
              {product2.name}
              <p>{`$${product2.price}`}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 h-96">
        {Product.slice(4, 6).map((product2: any) => (
          <Link href={`${product2.slug.current}`} key={product2.id}>
            <div className="flex flex-col gap-3 h-[300px] sm:h-[338px] md:h-[450px] bg-gray-100 shadow-sm shadow-black overflow-hidden group cursor-pointer">
              <div className="w-full mx-auto h-[70%] md:h-[80%] sm:h-[75%]">
                <Image
                  className="w-full object-cover h-[180px] sm:h-[220px] md:h-[330px] group-hover:scale-105 duration-200 transition-transform"
                  src={product2.image}
                  alt="The Dandy chair"
                  width={300}
                  height={150}
                />
              </div>

              <div className="text-sm gap-1 h-[20%] sm:h-[25%] text-[#2A254B] flex flex-col my-2 px-1">
                {product2.name}
                <p>{`$${product2.price}`}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>


                
                <Link href="/productlisting" >
                    <div className="flex justify-center mb-8" >
                        <button className="px-3 py-2 border-[1px] border-slate-300 justify-center " > View collection </button>
                    </div>
                </Link> 


                


                {/* Joining Section */}
                <div className=" bg-[#F9F9F9] flex items-center h-[481px] " >
                    <div className=" md:bg-white w-[90%] gap-5 mx-auto items-center flex flex-col justify-center  h-[364px] my-10 md:border-[1px] md:border-gray-300  " >
                        <div className=" text-center mb-8 text-2xl text-[#2A254B] flex flex-col gap-5 md:w-[400px] h-[114px] mx-auto  " >
                            Join the club and get the benefits
                            <p className="text-[14px] " >
                                Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more
                            </p>
                        </div>
                        <div className="flex w-full justify-center mt-8 my-2  h-[56px] " >
                            <input type="email" placeholder="your@email.com" id="email" name="email" className=" w-[70%] h-[56px] md:w-[300px] px-2 " />
                            <button className="bg-[#2A254B] px-3 w-[30%] md:w-[118px] h-[56px]   text-sm text-white " > Sign Up </button>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className=" h-[828px] md:h-[603px] flex flex-col md:flex-row " >

                    {/* left */}
                    <div className=" bg-[#FFFFFF]   oredr-1 h-3/5  md:h-full w-[90%] md:w-[50%] " >
                        <div className=" w-[80%] mx-auto flex-col flex h-full justify-between  py-8 md:py-14  " >
                            <div className=" text-[20px] md:text-[24px] text-[#2A254B] h-[84px] md:h-[255px] items-center " >
                                From a studio in London to a global brand with
                                over 400 outlets
                                <br /> <br />
                                <p className="  text-[14px] md:text-[16px] text-[#505977] " >When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.
                                    <br /> <br />
                                    Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>
                            </div>

                            <div className=" bg-[#F9F9F9] w-full sm:w-[150px] h-[56px] items-center justify-center flex " >
                                <button className="  px-2 py-1 " >Get in touch</button>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className=" w-[100%] md:w-[50%] h-2/5   md:h-full  " >
                        <Image className=" w-full object-cover h-full "
                            src="/images/sofa.png" width={400} height={500} alt="Imagge" />
                    </div>
                </div>
                 </div>
                {/* Footer */}
                <Footer />


        
        </div>

    )
}

export default Hero
