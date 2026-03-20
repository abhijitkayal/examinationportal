// "use client"

// import { useState } from "react"
// import Commision from "./commision"
// import Entry from "./entry"
// import Payment from "./payment"
// import Examination from "./examination"
// import LinkPage from "./link"
// export default function AdminPanel(){

//  const [tab,setTab] = useState("examination")

// return(

// <div className="flex min-h-screen bg-gray-100">

// {/* Sidebar */}

// <div className="w-64 bg-gray-900 text-white p-6">

// <h2 className="text-xl font-bold mb-8">
// Admin Panel
// </h2>

// <ul className="space-y-4">

// <li
// className="cursor-pointer hover:text-blue-400"
// onClick={()=>setTab("examination")}
// >
// Examination
// </li>

// <li
// className="cursor-pointer hover:text-blue-400"
// onClick={()=>setTab("payment")}
// >
// Payment
// </li>

// <li
// className="cursor-pointer hover:text-blue-400"
// onClick={()=>setTab("entry")}
// >
// Entry
// </li>

// <li
// className="cursor-pointer hover:text-blue-400"
// onClick={()=>setTab("commission")}
// >
// Commission Calculation
// </li>
// <li
// className="cursor-pointer hover:text-blue-400"
// onClick={()=>setTab("link")}
// >
// Link Management
// </li>

// </ul>

// </div>


// {/* Content Area */}

// <div className="flex-1 p-8">

// {tab === "examination" && (

// <Examination />

// )}


// {tab === "payment" && (

//     <Payment />
// )}


// {tab === "entry" && (

// <Entry />

// )}


// {tab === "commission" && (

// <Commision />

// )}
// {tab === "link" && (

// <LinkPage />

// )}

// </div>


// </div>

// )

// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import logo from "../dashboard/WhatsApp Image 2026-03-18 at 9.04.15 PM.jpeg"

import Commision from "./commision"
import Entry from "./entry"
import Payment from "./payment"
import Examination from "./examination"
import LinkPage from "./link"

export default function AdminPanel(){

  const [tab,setTab] = useState("examination")
  const [user,setUser] = useState(null)
  const [open,setOpen] = useState(false)

  const router = useRouter()
  const menu = [
  { name: "Examination", value: "examination" },
  { name: "Payment", value: "payment" },
  { name: "Entry", value: "entry" },
  { name: "Commission Calculation", value: "commission" },
  { name: "Link Management", value: "link" },
]

  // ✅ FETCH USER
  useEffect(()=>{
    const userId = localStorage.getItem("userId")

    if(!userId){
      router.push("/login")
      return
    }

    fetch(`/api/auth/user?id=${userId}`)
      .then(res=>res.json())
      .then(data=>setUser(data))

  },[router])

  // ✅ LOGOUT
  const logout = ()=>{
    localStorage.removeItem("userId")
    router.push("/login")
  }

  return(

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white text-black p-6">

         <div className="flex items-center gap-3 mb-6">
          <Image
            src={logo}
            alt="Examination Portal Logo"
            width={60}
            height={60}
            className=" object-cover rounded-xl"
            priority
          />
          <h2 className="text-lg font-bold">Examination Portal</h2>
        </div>

        <ul className="space-y-3">
  {menu.map((item) => (
    <li
      key={item.value}
      onClick={() => setTab(item.value)}
      className={`cursor-pointer px-3 py-2 rounded transition ${
        tab === item.value
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-200"
      }`}
    >
      {item.name}
    </li>
  ))}
</ul>

      </div>


      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* ✅ HEADER */}
        <div className="flex justify-between items-center bg-white shadow px-10 py-4 w-270 mx-10 my-5  rounded-xl mb-6">

          <h1 className="text-xl font-bold capitalize">
            {tab}
          </h1>

          {/* AVATAR */}
          <div className="relative">

            <div
              onClick={()=>setOpen(!open)}
              className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer font-bold"
            >
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded shadow-lg p-4 z-50">

                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium mb-3">{user?.email}</p>

                <button
                  onClick={logout}
                  className="w-full bg-red-500 text-white py-2 rounded"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>


        {/* CONTENT */}
        <div className="p-8 flex-1">

          {tab === "examination" && <Examination />}

          {tab === "payment" && <Payment />}

          {tab === "entry" && <Entry />}

          {tab === "commission" && <Commision />}

          {tab === "link" && <LinkPage />}

        </div>

      </div>

    </div>
  )
}