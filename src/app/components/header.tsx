"use client"
import Styles from "./header.module.css"
import { CiSearch } from "react-icons/ci";
import { GrCart } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

import { FormEvent, useEffect, useState } from "react";
// icons
import { HiBars4 } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

// Clerk Auth
//  Clerk Auth
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { User } from "@clerk/nextjs/server";

//  import Products from "../Data/product";
import { useAppSelector } from "../lib/store/hooks";

import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";


function Header() {

  const pathname = usePathname()   /// Current path leny k leye 
  const isactive = (path: string) => pathname === path;

  // Auth Clerk
  // get User Information
  const { isLoaded, isSignedIn, user } = useUser()
  console.log(user?.firstName)


  // menu bar state
  const [isOpen, SetisOpen] = useState(false)
  const toggleButton = () => {
    SetisOpen(!isOpen)
  }

  const itemid: any = useAppSelector(state => state.cart.item)


  // Adding searchbar functionility 
  const [searcbaropen, setSearchbaropen] = useState(true)
  const tooglesearch = () => {
    setSearchbaropen(!searcbaropen)
  }

  const router = useRouter()

  //storing data
  const [Data, setData] = useState<any>([])

  //import data from sanity
  useEffect(() => {
    const fetchProducts = async () => {

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
    }

    fetchProducts()

  }, [])


  // managing searchBar
  const [searchQuery, setSearchQuery] = useState<any>()

  const [filteredData, setFilteredData] = useState([])


  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!searchQuery) return;

    // User ko search-result page par bhejo query ke sath
    router.push(`/searchResult?query=${searchQuery}`);    //sending input with the query .

  }

  console.log("filtered data", filteredData)

  return (
    <>
      <div className=" max-w-[1440px]  mx-auto fixed top-0 w-full bg-white z-50 " >
        {/* Banner */}
        <header className="flex  h-[85px] md:h-[51px]   text-[#22202E] items-center py-4  md:py-0 justify-between px-6 mt-3 text-xl " >

          <div className=" hidden md:flex  gap-1 items-center  text-end md:w-1/3 order-2 md:order-1 absolute z-50  right-32  md:static  font-Clash ">
            {!searcbaropen && (
              <div className="absolute flex gap-2 top-[50px] md:static md:block w-[248px]  bg-white border-[#22202E] p-2">
                <form className="flex gap-[1px] " onSubmit={handlesubmit} >
                  <input
                    className="w-[150px] text-[14px] rounded-md  px-1 border-gray-400 border-[1px]"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                  <button type="submit" className="text-[15px] my-auto mx-auto font-semibold text-gray-800 ">Search</button>
                </form>
              </div>
            )}
            <CiSearch onClick={tooglesearch} className="order-2 text-2xl cursor-pointer  md:order-1 absolute  z-50 block right-14 mx-2 sm:mx-11 md:mx-0  md:static  md:block  font-Clash " />
          </div>


          <h2 className=" md::w-1/3 text-center ordere-1 md:order-2" >Avion</h2>

          <div className=" md:w-1/3  justify-end flex order-3 gap-3 text-2xl z-50 absolute right-14 md:flex md:static cursor-pointer  " >

            <div className="flex md:hidden  gap-1 items-center  text-end  order-1  z-50     font-Clash ">
              {!searcbaropen && (
                <div className="absolute flex gap-2 top-[50px] left-[-25%] md:static md:block w-[248px]  bg-white border-[#22202E] ">
                  <form className="flex gap-[1px]" onSubmit={handlesubmit} >
                    <input
                      className="w-[150px] text-[14px] rounded-md  px-1 border-gray-400 border-[1px]"
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} />
                    <button type="submit" className="text-[15px] my-auto mx-auto font-semibold text-gray-800 ">Search</button>
                  </form>
                </div>
              )}
              <CiSearch onClick={tooglesearch} className="order-2 text-2xl cursor-pointer  z-50 block md:static  md:block  font-Clash " />
            </div>


            <div className="relative order-2  "  >
              <Link href="./cart"  >
                <GrCart />
                <span className=" absolute bg-[#2A254B] text-white -top-3 -right-2 h-[18px] w-[18px] flex items-center justify-center rounded-full text-[14px]   " >
                  {itemid.length}
                </span>
              </Link>
            </div>



            <div className=" flex gap-1 mx-1 items-center order-3 " >
              <Link href="">
                {<CgProfile />}
              </Link>
              <SignedOut >
                <SignInButton>
                  <p className="text-sm items-center " >SignIn</p>
                </SignInButton>
              </SignedOut >
            </div>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <h1 className="text-[15px] leading-[25px] hidden sm:static sm:block text-gray-700 my-auto " >{user?.firstName} </h1>
          </div>

          {/* buttons */}
          <div className="flex order-4 gap-5  text-3xl md:hidden font-santoshi z-50 " >

            {!isOpen ?
              <button>  <HiBars4 onClick={toggleButton} /></button>
              :
              <button><MdClose onClick={toggleButton} /></button>
            }
          </div>

        </header >

        <div className=" h-[1px] hidden md:block w-[95%] mx-auto my-[6px] bg-slate-400  " ></div>

        <nav className="flex relative   " >
          <ul className={`flex flex-col md:h-[55px] md:flex-row md:justify-center   absolute right-0  z-10 w-[50%] md:w-[90%] justify-center  h-screen   text-center  md:py-0 bg-white md:static md:items-start  text-[#726E8D] text-sm gap-5 py-7  md:mx-auto ${isOpen ? " top-[5px] right-0 " : "top-[-100vh] "}  `} >
            {/* <ul className={`flex flex-col  absolute right-0 top-[80px] z-10 w-[50% h-full bg-white   `} > */}
            <Link href="/" ><li className={`${Styles.btn}  hover:text-[#5c5879]  ${isactive("/") ? Styles.active : ""} `} > Home  </li> </Link>
            <Link href="/productlisting"><li className={`${Styles.btn} hover:text-[#5c5879] ${isactive("/productlisting") ? Styles.active : ""} `}  >Product Listing  </li></Link>
            <Link href="/about" >  <li className={` ${Styles.btn} hover:text-[#5c5879]  ${isactive("/about") ? Styles.active : ""} `}>About Us </li> </Link>
            <Link href="/contact" > <li className={` ${Styles.btn} hover:text-[#5c5879]  ${isactive("/contact") ? Styles.active : ""} `}> Contact Us   </li></Link>
            <li>Ceramics </li>
            <li> Tables  </li>
            <li>Crockery </li>
            <li>Cutlery</li>
          </ul>

        </nav>
      </div >

    </>
  )
}

export default Header
