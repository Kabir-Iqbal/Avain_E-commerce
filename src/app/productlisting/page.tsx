"use client"
import Header from "../components/header"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa6";
import Footer from "../components/footer";
import Link from "next/link";

// icons
import { HiBars4 } from "react-icons/hi2";
import { MdClose, MdKeyOff } from "react-icons/md";
import { client } from "@/sanity/lib/client";

import { useAppSelector } from "../lib/store/hooks";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { set } from "sanity";



const Page = () => {
  //storing data
  const [Data, setData] = useState([])

  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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


  const [showOptions, SetShowOptions] = useState({
    Category: false,
    ProductType: false,
    Price: false,
    Brand: false,
    Dateadded: false,
  })

  const toggleButton = (key: keyof typeof showOptions) => {
    SetShowOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }


  // responsive
  const [showlinks, SetShowlinks] = useState(false)
  const toogle = () => {
    SetShowlinks(!showlinks)
  }

  // Paggination
  const ITEMS_PER_PAGE = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const totalpages = Math.ceil(Data.length / ITEMS_PER_PAGE)

  const currentpages = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const HandlePriceChange = (priceRange: string) => {
    setSelectedPrices((prev: any) =>
      prev.includes(priceRange) ? prev.filter((p: any) => p !== priceRange) : [...prev, priceRange]
    );

  }
  // Apply filtering
  useEffect(() => {
    if (selectedPrices.length === 0) {
      setFilteredData(Data);
    } else {
      setFilteredData(
        Data.filter((product: any) => {
          const price = product.price;
          return selectedPrices.some((range) => {
            const [min, max] = range.split("-").map(Number);
            return price >= min && price <= max;
          });
        })
      );
    }
  }, [selectedPrices, Data]);


  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredData(Data);
    } else {
      setFilteredData(Data.filter((product: any) => selectedCategories.includes(product.category)));
    }
  }, [selectedCategories, Data]);



  if (!Data) {
    return <div>
      Loading...
    </div>
  }

  return (
    <div className="max-w-[1440px] mx-auto w-[100%] " >
      {/* Hedaer */}
      <Header />
      {/* Page-1 */}
      <div className=" pt-[132px] w-full h-[290px] " >
        <Image className="w-full h-full " src="/images/Frame.png" width={1400} height={280} alt="Frame pic" />
      </div>

      {/* responsive */}
      <div className="flex gap-3 cursor-pointer items-center md:hidden px-8 py-2 z-20 " >
        <p className="font-bold" > Filter : </p>
        <div className="flex gap-5 text-2xl  ">
          {showlinks ?
            <MdClose onClick={toogle} />
            :
            <HiBars4 onClick={toogle} />
          }
        </div>
      </div>

      {/* 2nd Component */}
      <div className={`flex flex-col md:flex-row gap-5 md:gap-0 mt-3 absolute left-[-10000px] transition-all duration-300 bg-white px-16 py-16 z-10 md:z-0 md:static md:justify-between md:px-9 md:py-2 font-santoshi ${showlinks ? "left-[0px]  " : ""}  `} >
        {/* left */}
        <div className="flex flex-col md:flex-row gap-5" >
          <div className="cursor-pointer" >
            <div className="flex gap-[1px] items-center" onClick={() => toggleButton("Category")}>
              Category
              <FaCaretDown className="text-[16px] text-gray-700 " />
            </div>

            {/* Options checkbox */}
            {showOptions.Category && (
              <div className="flex flex-col gap-3" >
                <label htmlFor="Accessories"  >
                  <input type="Checkbox" id="Accessories" checked={selectedCategories.includes("Accessories")}
                    onChange={() => handleCategoryChange("Accessories")} /> <span> Accessories</span>
                </label>

                <label htmlFor="Outdoor furniture">
                  <input type="Checkbox" id="Outdoor furniture" checked={selectedCategories.includes("Outdoor furniture")}
                    onChange={() => handleCategoryChange("Outdoor furniture")} /> <span>Outdoor Furniture</span>
                </label>

                <label htmlFor="Office">
                  <input type="checkbox" id="Office" checked={selectedCategories.includes("Office")}
                    onChange={() => handleCategoryChange("Office")} /> <span>Office Furniture </span>
                </label>

                <label htmlFor="Home & Kitchen">
                  <input type="checkbox" id="Home & Kitchen" checked={selectedCategories.includes("Home & Kitchen")}
                    onChange={() => handleCategoryChange("Home & Kitchen")}
                  /> <span>Home & Kitchen </span>
                </label>
              </div>
            )}
          </div>

          {/* 2nd */}
          <div className="cursor-pointer" >
            <div className="flex gap-[1px] items-center" onClick={() => toggleButton("ProductType")}>
              ProductType
              <FaCaretDown className="text-[16px] text-gray-700 " />
            </div>

            {/* Options checkbox */}
            {showOptions.ProductType && (
              <div className="flex flex-col gap-3" >
                <label htmlFor="Seatings">
                  <input type="Checkbox" id="Seatings" /> <span>Seating</span>
                </label>

                <label htmlFor="Storage">
                  <input type="Checkbox" id="Storage" /> <span>Storage</span>
                </label>

                <label htmlFor="Beds">
                  <input type="Checkbox" id="Beds" /> <span>Beds</span>
                </label>
              </div>
            )}
          </div>

          {/* 3rd */}
          <div className="cursor-pointer" >
            <div className="flex gap-[1px] items-center " onClick={() => toggleButton("Price")}>
              Price  <FaCaretDown className="text-[16px] text-gray-700" />
            </div>

            {/* Options checkbox */}
            {showOptions.Price && (
              <div className="flex flex-col gap-3" >
                <label htmlFor="price 100 to 300">
                  <input type="checkbox" id="price 100 to 300" onChange={() => HandlePriceChange("100-300")} checked={selectedPrices.includes("100-300")} /> <span>$100 to $300 </span>
                </label>

                <label htmlFor="price 300 to 800">
                  <input type="checkbox" id="price 300 to 800" onChange={() => HandlePriceChange("300-800")} checked={selectedPrices.includes("300-800")} /> <span>$300 to $800 </span>
                </label>

                <label htmlFor="price 800 to 5000">
                  <input type="checkbox" id="price 800 to 5000" onChange={() => HandlePriceChange("800-5000")} checked={selectedPrices.includes("800-5000")} /> <span>$800 to $5000 </span>
                </label>
              </div>
            )}
          </div>


          {/* 4th */}


          <div className="cursor-pointer" >
            <div className="flex gap-[1px] items-center " onClick={() => toggleButton("Brand")}>
              Brand
              <FaCaretDown className="text-[16px] text-gray-700 " />
            </div>

            {/* Options checkbox */}
            {showOptions.Brand && (
              <div className="flex flex-col gap-3" >
                <label htmlFor="West Elm">
                  <input type="Checkbox" id="West Elm" /> <span>West Elm</span>
                </label>

                <label htmlFor="Ashley Furniture">
                  <input type="Checkbox" id="Ashley Furniture" /> <span>Ashley Furniture</span>
                </label>

                <label htmlFor="IKEA">
                  <input type="Checkbox" id="IKEA" /> <span>IKEA</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col md:flex-row  gap-5" >
          <p>Shorting By: </p>

          <div className="cursor-pointer " >
            <div className="flex gap-[1px] items-center " onClick={() => toggleButton("Dateadded")} >
              Date added
              <FaCaretDown className="text-[16px] text-gray-700" />
            </div>
            {showOptions.Dateadded &&
              <div className="flex flex-col gap-5" >
                <label htmlFor="price 1 to 10">
                  <input type="Checkbox" id="price 1 to 10" /> <span>01 to 10 </span>
                </label>

                <label htmlFor="price 11 to 20">
                  <input type="Checkbox" id="price 11 to 20" /> <span>11 to 20 </span>
                </label>

                <label htmlFor="price 21 to 30">
                  <input type="Checkbox" id="price 21 to 30" /> <span>21 to 30 </span>
                </label>
              </div>
            }
          </div>
        </div>

      </div>


      {/* Products Listing */}


      {/* first line products */}

      <div className="w-[95%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 my-8 font-Clash">
        {currentpages.map((product: any) => (
          <Link key={product.slug} href={`${product.slug.current}`} className="group">
            <div className="w-full mx-auto p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Image Section */}
              <div className="w-full overflow-hidden rounded-lg">
                <Image
                  className="w-full object-cover h-[180px] sm:h-[220px] md:h-72 group-hover:scale-105 transition-transform duration-300"
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={150}
                />
              </div>
              {/* Text Section */}
              <div className="text-sm text-[#2A254B] flex flex-col items-center my-2 px-1 text-center font-medium">
                <p>{product.name}</p>
                <p className="text-[#6B7280] text-base font-semibold">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>


      <div className="flex justify-center mb-8">
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalpages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>


      {/* Button */}
      <Link href="/Error" > <div className="flex justify-center my-8 mb-24" >
        <button className="px-3 py-2 border-[1px] border-slate-300 justify-center " > View collection </button>
      </div></Link>



      {/* footer */}
      <Footer />
    </div>
  )
}

export default Page



