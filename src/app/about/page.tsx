import Header from "../components/header"
import Image from "next/image"
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCheckCircle } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { PiFlowerTulipLight } from "react-icons/pi";
import Footer from "../components/footer";
import Link from "next/link";


function Page() {
    return (
        <>
            {/* header */}
            <Header />
        <div className=" w-[90%] pt-[132px] mx-auto flex flex-col gap-10 " >

                <div className="flex flex-col md:flex-row gap-12 md:gap-1 mt-10 " >
                    <div className=" font-Clash w-[90%] mx-auto md:mx-0  md:flex-1 text-2xl md:text-3xl text-[#2A254B] ">
                        <p className=" w-[98%] md:w-[90%] mx-auto text-center md:text-start " >  A brand built on the love of craftmanship,
                            quality and outstanding customer service </p>   </div>
              <div className=" w-[90%] mx-auto md:mx-0 md:flex-1  text-center font-santoshi  "> 
              <Link href="/productListing" >    <button className="text-[#2A254B] w-[80%] md:w-[40%]  bg-slate-100 px-3 py-2 " type="button" > View Our Products </button></Link>  
                        </div>
                </div>

                     {/* First listing  */}
                     <div className="flex flex-col md:flex-row gap-3 my-10  " >
                        <div className="bg-[#2A254B] h-[478px] flex-1 " >
                            <div className="flex flex-col gap-14 justify-between h-full text-white px-4 sm:px-8 md:px-14 py-14 ">
                                 <div >
                                    <p className=" font-Clash text-2xl  " >It started with a small idea</p>
                                    <p className=" font-santoshi text-[15px] mt-3 md:mt-0 " >A global brand with local beginnings, our story begain in a small studio in South London in early 2014</p>
                                 </div>

                                 <div>
                                    <button className=" bg-[#F9F9F926] px-3 py-2 text-sm  " >View Location</button>
                                 </div>
                            </div>
                        </div>
                        <div className="flex-1 h-[478px] text-[#2A254B] font-santoshi " >
                             <Image className="w-full h-full object-cover "
                              src="/images/yelowsofa.png" alt="Sofa " width={400} height={400} />
                        </div>
                     </div> 
            </div>

            <div className="flex flex-col md:flex-row h-full md:h-[603px] " >
                {/* left */}
                <div className="flex-1 h-full  "> <Image className="w-full h-full  "
                src="/images/sofa.png" alt="Sofa-pic" width={500} height={500} /> </div>
                {/* Right */}
                <div className="flex-1 bg-[#F9F9F9] h-full ">
                     <div className=" w-[90%] md:w-[80%] mx-auto h-full flex flex-col justify-between py-14 " >
                        <div className=" w-[90%] mx-auto " >
                        <p className="text-[24px] text-[#2A254B]  font-Clash " >Our service isn’t just personal, it’s actually
                        hyper personally exquisite</p>
                        <br/>
                        <p className="text-[16px] text-[#505977] font-santoshi " > When we started Avion, the idea was simple. Make high quality furniture affordable and 
                            available for the mass market. </p>
                            <br/>
                        <p className="text-[16px] text-[#505977] font-santoshi ">Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design 
                            so our Chelsea boutique become the hotbed for the London interior design community.</p>    
                     </div>
                     <div className="px-4 md:px-8 text-[#2A254B] font-santoshi " >
                         <button className=" bg-[#FFFFFF] px-3 py-2 font-santoshi mt-5 md:mt-0 " > Get in Touch </button>
                     </div>
                 </div>

                </div>
            </div>

        {/* Cards  */}
            <div className="w-[97%] mx-auto mt-20 " >
                <p className="font-Clash text-center text-[24px] " >What makes our brand different</p>
             <div className="flex  flex-wrap   justify-center gap-7 my-10 px-2 md:px-0  " >
                <div className=" md:w-1/5 h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 " > 
                         <TbTruckDelivery className="mb-2 text-2xl " />
                         <br/>
                         <p className="font-Clash " >Next day as standard  </p>
                         <p className="text-sm mt-2 font-santoshi "> Order before 3pm and get your order the next day as standard</p>
                     </div>
                <div className=" md:w-1/5  h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 "  >
                         <MdOutlineCheckCircle className="mb-2 text-2xl" />
                         <br/>
                         <p className="font-Clash " >Made by true artisans </p>
                         <p className="text-sm mt-2 font-santoshi " >  Handmade crafted goods made with
                             real passion and craftmanship</p>
                </div>
                <div className=" md:w-1/5 h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 "  >
                         <FaRegCreditCard className="mb-2 text-2xl " />
                         <br/>
                         <p className="font-Clash " >Unbeatable prices </p>
                         <p className="text-sm mt-1 font-santoshi "> For our materials and quality you won’t find better prices anywhere</p>
                </div>
                <div className=" md:w-1/5 h-[244px] bg-[#F9F9F9] flex flex-col justify-center text-xl px-4 "  >
                         <PiFlowerTulipLight className="mb-2 text-2xl " />
                         <br/>
                         <p className="font-Clash " >Recycled packaging </p>
                         <p className="text-sm mt-1 font-santoshi ">  We use 100% recycled packaging to ensure our footprint is manageable</p>
                </div>
             </div>
            </div>

            {/* Search bar */}
            <div className=" bg-[#F9F9F9] flex items-center h-[481px] " >
                <div className=" md:bg-white w-[95%] md:w-[90%] gap-5 mx-auto items-center flex flex-col justify-center  h-[364px] my-10 md:border-[1px] md:border-gray-300  " >
                    <div className=" text-center mb-8 font-Clash text-xl sm:text-2xl text-[#2A254B] flex flex-col gap-5 md:w-[400px] h-[114px] mx-auto  " >
                        Join the club and get the benefits
                        <p className=" text-[13px] sm:text-[14px] font-santoshi " >
                            Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more
                        </p>
                    </div>
                    <div className="flex w-[90%] md:w-full justify-center mt-8 my-2  h-[56px] font-santoshi " >
                        <input type="email" placeholder="your@email.com" id="email" name="email" className=" w-[70%] h-[56px] md:w-[300px] px-2 " />
                        <button className="bg-[#2A254B] px-3 w-[30%] md:w-[118px] h-[56px]   text-sm text-white " > Sign Up </button>
                    </div>
                </div>
            </div>
        
        {/* Footer */}
        <Footer />

        </>
    )
}

export default Page
