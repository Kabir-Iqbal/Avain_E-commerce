"use client"
import { FormEvent, useRef } from "react"
import { useRouter } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { json } from "stream/consumers"

const Form = () => {

    const router = useRouter()

   const emailref = useRef<HTMLInputElement>(null)
   const passwordref = useRef<HTMLInputElement>(null)
   
   const HandleSubmit = async(e : FormEvent<HTMLFormElement>)=> {
          e.preventDefault()

          const email = emailref.current?.value
          const password = passwordref.current?.value

          const admindata = await fetch("/api/admin",{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({email,password})
          })

          const data = await admindata.json()     

          if (data.redirectUrl) {                        // if data have redirect then 
            router.push(data.redirectUrl)                /// pust to redurect url
          }
   }



  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Login</h2>
                <form onSubmit={HandleSubmit}  className="space-y-4">
                    <div>
                        <label className="block text-gray-600">Email</label>
                        <input
                         ref={emailref}
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Password</label>
                        <input
                        ref={passwordref}
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
  )
}

export default Form
