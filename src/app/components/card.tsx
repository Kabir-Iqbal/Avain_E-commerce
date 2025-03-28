import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCheckCircle } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { PiFlowerTulipLight } from "react-icons/pi";

const features = [
  {
    icon: <TbTruckDelivery className="mb-2 text-4xl text-[#2A254B]" />, 
    title: "Next day as standard",
    description: "Order before 3pm and get your order the next day as standard."
  },
  {
    icon: <MdOutlineCheckCircle className="mb-2 text-4xl text-[#2A254B]" />, 
    title: "Made by true artisans",
    description: "Handmade crafted goods made with real passion and craftsmanship."
  },
  {
    icon: <FaRegCreditCard className="mb-2 text-4xl text-[#2A254B]" />, 
    title: "Unbeatable prices",
    description: "For our materials and quality, you won’t find better prices anywhere."
  },
  {
    icon: <PiFlowerTulipLight className="mb-2 text-4xl text-[#2A254B]" />, 
    title: "Recycled packaging",
    description: "We use 100% recycled packaging to ensure our footprint is manageable."
  }
];

export default function Cards() {
  return (
    <div className="w-[97%] mx-auto mt-20 text-center">
      <p className="font-Clash text-[24px] text-[#2A254B]">What makes our brand different</p>
      <div className="flex flex-wrap justify-center gap-6 my-10 ">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-[45%] md:w-[30%] lg:w-1/5 h-[244px] bg-[#F9F9F9] flex flex-col items-center justify-center text-xl p-0 md:px-0 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            {feature.icon}
            <p className="font-Clash font-bold text-lg">{feature.title}</p>
            <p className="text-sm mt-2 font-santoshi text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


