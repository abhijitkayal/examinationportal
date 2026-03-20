"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){

const router = useRouter()

const [name,setName] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const [showPassword,setShowPassword] = useState(false)

const login = async(e)=>{
e.preventDefault()

setLoading(true)
if(name=="admin@gmail.com" && password=="admin123"){
    router.push("/admin");
    return;
}

try{

const res = await fetch("/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
password
})
})

const data = await res.json()

if(!res.ok){
alert(data.message)
setLoading(false)
return
}

alert("Login successful")

// Keep session for dashboard guard
localStorage.setItem("userId", data.userId)

// ROLE BASED REDIRECT
if(data.role === "school"){
router.push(`/school/${data.userId}`)
}
else if(data.role === "staff"){
router.push(`/staff/${data.userId}`)
}
else if(data.role === "student"){
router.push(`/student/${data.userId}`)
}

}catch{
alert("Something went wrong")
}

setLoading(false)

}

return(

<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600">

<div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">

<h2 className="text-3xl font-bold text-center mb-6">
Login
</h2>

<form onSubmit={login} className="space-y-4">

<input
type="text"
placeholder="Enter name"
className="w-full border p-3 rounded-lg"
onChange={(e)=>setName(e.target.value)}
required
/>

<div className="relative">
<input
type={showPassword ? "text" : "password"}
placeholder="Enter password"
className="w-full border p-3 rounded-lg pr-20"
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
>
{showPassword ? "Hide" : "Show"}
</button>
</div>

<button
className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
disabled={loading}
>
{loading ? "Logging in..." : "Login"}
</button>

</form>

<p className="text-center text-sm mt-4">

Don&apos;t have an account?  
<a href="/signup" className="text-blue-600 ml-1">
Sign Up
</a>

</p>

</div>

</div>

)

}