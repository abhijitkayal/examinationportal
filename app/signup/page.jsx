"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Signup() {
const router = useRouter();
const [role,setRole] = useState("student")

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
address:"",
aadhaar:"",
referralCode:"",
password:"",
confirm:""
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e)=>{
e.preventDefault()

if(form.password !== form.confirm){
alert("Passwords do not match")
return
}

const res = await fetch("/api/auth/signup",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
...form,
role
})
})

const data = await res.json()
const generatedCode = data.uniqueCode || data.referralCode


if(!res.ok){
alert(data.message || data.error || "Signup failed")
return
}

if(generatedCode){
alert(`${data.message}\nYour unique code: ${generatedCode}`)
router.push("/login")
}else{
alert(data.message)
}
}

return (

<div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">

<div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">

<h2 className="text-2xl font-bold text-center mb-6">
Create Account
</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<select
className="w-full border p-2 rounded"
value={role}
onChange={(e)=>setRole(e.target.value)}
>

<option value="school">School</option>
<option value="staff">Staff</option>
<option value="student">Student</option>

</select>

<input
name="name"
placeholder="Full Name"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<input
name="email"
placeholder="Email"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<input
name="phone"
placeholder="Phone"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

{role !== "student" && (
<>

<p className="text-xs text-gray-500">
Unique code will be generated automatically after signup.
</p>

<input
name="address"
placeholder="Address"
className="w-full border p-2 rounded"
onChange={handleChange}
/>


</>

)}

{role === "student" && (
    <>

<input
name="aadhaar"
placeholder="Aadhaar Number"
className="w-full border p-2 rounded"
onChange={handleChange}
/>
<input
name="referralCode"
placeholder="Referral Code (optional)"
className="w-full border p-2 rounded"
onChange={handleChange}
/>
</>

)}

<input
type="password"
name="password"
placeholder="Password"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<input
type="password"
name="confirm"
placeholder="Confirm Password"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<button
className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
>

Sign Up

</button>

</form>

<p className="text-center mt-4 text-sm">

Already have an account?  
<a href="/login" className="text-blue-600 font-medium">
 Login
</a>

</p>

</div>

</div>

)

}