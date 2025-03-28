import Header from "../components/header";
import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCheckCircle } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { PiFlowerTulipLight } from "react-icons/pi";
import Footer from "../components/footer";
import Link from "next/link";
import Cards from "../components/card";

function Page() {
  return (
    <>
      {/* header */}

      <div className="max-w-[1440px] w-[100%] mx-auto">
        <Header />
        <div className=" w-[90%] pt-[132px] mx-auto flex flex-col gap-10 ">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-6 mt-10 px-6">
      {/* Text Section */}
      <div className="font-Clash w-full md:w-1/2 text-2xl md:text-3xl text-[#2A254B] text-center md:text-left">
        <p className="max-w-lg mx-auto md:mx-0 leading-snug">
          A brand built on the love of craftsmanship, quality, and outstanding customer service.
        </p>
      </div>

      {/* Button Section */}
      <div className="w-full md:w-1/2 flex justify-center ">
        <Link href="/productlisting">
          <button
            className="text-[#2A254B] items-center bg-slate-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-[#2A254B] hover:text-white hover:shadow-lg"
            type="button"
          >
            View Our Products
          </button>
        </Link>
      </div>
    </div>

          {/* First listing  */}
          <div className="flex flex-col md:flex-row gap-12 my-10">
            <div className="bg-[#2A254B] h-[478px] flex-1 rounded-lg shadow-lg px-4 sm:px-0 md:px-10 py-16 flex flex-col justify-between text-white">
              <div className="flex flex-col gap-14 justify-between h-full text-white px-4 sm:px-8 md:px-2 lg:px-14 py-14 ">
                <div>
                  <p className="font-Clash text-xl sm:text-2xl font-bold leading-relaxed">
                    It started with a small idea
                  </p>
                  <p className="font-santoshi text-base opacity-90 mt-3 md:mt-0">
                    A global brand with local beginnings, our story began in a
                    small studio in South London in early 2014
                  </p>
                </div>

                <div>
                  <button className="bg-white bg-opacity-15 px-4 py-2 text-sm rounded-md transition-transform duration-300 hover:bg-opacity-30 hover:scale-105">
                    View Location
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 h-[478px] text-[#2A254B] font-santoshi ">
              <Image
                className="w-full h-full object-cover "
                src="/images/yelowsofa.png"
                alt="Sofa "
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-full md:h-[603px] ">
          {/* left */}
          <div className="flex-1 h-full  ">
            {" "}
            <Image
              className="w-full h-full  "
              src="/images/sofa.png"
              alt="Sofa-pic"
              width={500}
              height={500}
            />{" "}
          </div>
          {/* Right */}
          <div className="flex-1 bg-[#F9F9F9] h-full ">
            <div className=" w-[90%] md:w-[80%] mx-auto h-full flex flex-col justify-between py-14 ">
              <div className=" w-[90%] mx-auto ">
                <p className="text-[24px] text-[#2A254B]  font-Clash ">
                  Our service isn’t just personal, it’s actually hyper
                  personally exquisite
                </p>
                <br />
                <p className="text-[16px] text-[#505977] font-santoshi ">
                  {" "}
                  When we started Avion, the idea was simple. Make high quality
                  furniture affordable and available for the mass market.{" "}
                </p>
                <br />
                <p className="text-[16px] text-[#505977] font-santoshi ">
                  Handmade, and lovingly crafted furniture and homeware is what
                  we live, breathe and design so our Chelsea boutique become the
                  hotbed for the London interior design community.
                </p>
              </div>
              <div className="px-4 md:px-8 text-[#2A254B] font-santoshi ">
                <button className=" bg-[#FFFFFF] px-3 py-2 font-santoshi mt-5 md:mt-0 ">
                  {" "}
                  Get in Touch{" "}
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Cards  */}
        <Cards />
      

        {/* Search bar */}
        <div className=" bg-[#F9F9F9] flex items-center h-[481px] ">
          <div className=" md:bg-white w-[95%] md:w-[90%] gap-5 mx-auto items-center flex flex-col justify-center  h-[364px] my-10 md:border-[1px] md:border-gray-300  ">
            <div className=" text-center mb-8 font-Clash text-xl sm:text-2xl text-[#2A254B] flex flex-col gap-5 md:w-[400px] h-[114px] mx-auto  ">
              Join the club and get the benefits
              <p className=" text-[13px] sm:text-[14px] font-santoshi ">
                Sign up for our newsletter and receive exclusive offers on new
                ranges, sales, pop up stores and more
              </p>
            </div>
            <div className="flex w-[90%] md:w-full justify-center mt-8 my-2  h-[56px] font-santoshi ">
              <input
                type="email"
                placeholder="your@email.com"
                id="email"
                name="email"
                className=" w-[70%] h-[56px] md:w-[300px] px-2 "
              />
              <button className="bg-[#2A254B] px-3 w-[30%] md:w-[118px] h-[56px]   text-sm text-white ">
                {" "}
                Sign Up{" "}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Page;
