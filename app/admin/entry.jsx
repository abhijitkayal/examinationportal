"use client"

import React, { useEffect, useState } from "react"

const Entry = () => {

const [users,setUsers] = useState([])
const [loading,setLoading] = useState(true)
const [publishing,setPublishing] = useState(false)

 const publishResult = async()=>{

setPublishing(true)

try{
const res = await fetch("/api/result",{
method:"PATCH",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({})
})

if(!res.ok){
throw new Error("Failed to publish results")
}

alert("All results published")

}catch(error){
alert(error.message || "Failed to publish results")
}finally{
setPublishing(false)
}

}

useEffect(()=>{

const fetchUsers = async () => {

try{

const res = await fetch("/api/users")
const data = await res.json()

setUsers(data)
console.log("Fetched users:", data);

}catch(error){
console.log("Error fetching users",error)
}

setLoading(false)

}

fetchUsers()

},[])

return (

<div className="p-6">

<div className="bg-white p-6 rounded shadow">

<h2 className="text-xl font-semibold mb-6">
Entry Section
</h2>

<button
onClick={publishResult}
disabled={publishing}
className="bg-green-600 text-white px-4 py-2 rounded mb-6 disabled:opacity-60"
>
{publishing ? "Publishing..." : "Publish All Results"}
</button>

{loading ? (

<p>Loading users...</p>

) : (

<div className="overflow-x-auto">

<table className="w-full border border-gray-300">

<thead className="bg-gray-100">

<tr>
<th className="border p-2">Name</th>
<th className="border p-2">Email</th>
<th className="border p-2">Phone</th>
<th className="border p-2">Role</th>
<th className="border p-2">Code</th>
<th className="border p-2">Address</th>
<th className="border p-2">Aadhaar</th>
<th className="border p-2">Reg Date</th>
</tr>

</thead>

<tbody>

{users.length === 0 ? (

<tr>
<td colSpan="7" className="text-center p-4">
No users found
</td>
</tr>

) : (

users.map((user)=>(
<tr key={user._id} className="text-center">

<td className="border p-2">{user.name}</td>
<td className="border p-2">{user.email}</td>
<td className="border p-2">{user.phone}</td>
<td className="border p-2">{user.role}</td>
<td className="border p-2">{user.uniqueCode || "Self"}</td>
<td className="border p-2">{user.address || "-"}</td>
<td className="border p-2">{user.aadhaar || "-"}</td>
<td className="border p-2">{new Date(user.createdAt).toLocaleDateString()}</td>


</tr>
))

)}

</tbody>

</table>

</div>

)}

</div>

</div>

)

}

export default Entry