import { FaFacebook, FaInstagram, FaSkype, FaTwitter, FaPinterest,  FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

function Footer() {
  return (
    <>
      <div className="bg-[#2A254B] py-3  md:h-[380px]  " >
        <div className="flex  flex-col w-[90%] py-8 h-full justify-between  mx-auto   " >
        <div className=" flex flex-col md:flex-row md:justify-between gap-8 " >
          <div className="flex gap-8 md:gap-16 w-full md:w-[60%] flex-wrap text-white items-start font-Clash " >
          <div>
            <h3 className="text-lg font-semibold">Menu</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>New arrivals</li>
              <li>Best sellers</li>
              <li>Recently viewed</li>
              <li>Popular this week</li>
              <li>All products</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Crockery</li>
              <li>Furniture</li>
              <li>Homeware</li>
              <li>Plant pots</li>
              <li>Chairs</li>
              <li>Crockery</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Our company</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/About">About us</Link></li>
              <li>Vacancies</li>
              <li>Contact us</li>
              <li>Privacy</li>
              <li>Returns policy</li>
            </ul>
          </div>
          </div>

            {/* Right Side */}
        <div className="w-full md:w-[40%]">
          <h3 className="text-lg text-white font-semibold">Join our mailing list</h3>
          <div className="flex mt-3">
            <input 
              className="w-full md:w-[75%] h-[50px] px-4 bg-[#2A254B] border border-gray-500 placeholder-gray-400 text-white focus:outline-none"
              type="email" placeholder="your@email.com" />
            <button className="w-[100px] h-[50px] bg-white text-black font-semibold hover:bg-gray-200 transition">Sign up</button>
          </div>
        </div>
      </div>
        
         {/* Bottom Section */}
      <div className="mt-8 border-t text-white border-gray-500 pt-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2022 Avion LTD</p>
          <div className="flex gap-4 mt-3 md:mt-0 text-xl">
            <FaLinkedin className="cursor-pointer hover:text-gray-400" />
            <FaFacebook className="cursor-pointer hover:text-gray-400" />
            <FaInstagram className="cursor-pointer hover:text-gray-400" />
            <FaSkype className="cursor-pointer hover:text-gray-400" />
            <FaTwitter className="cursor-pointer hover:text-gray-400" />
            <FaPinterest className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Footer
