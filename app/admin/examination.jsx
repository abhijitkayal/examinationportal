"use client"

import React, { useState, useEffect } from "react"

const Examination = () => {

const [type,setType] = useState("mcq")
const [open,setOpen] = useState(false)
const [questions,setQuestions] = useState([])

const [form,setForm] = useState({
question:"",
answer:"",
time:"",
marks:"",
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}


// FETCH ALL QUESTIONS FROM DATABASE
useEffect(()=>{

fetch("/api/question")
.then(res=>res.json())
.then(data=>setQuestions(data))

},[])



const handleSubmit = async(e)=>{
e.preventDefault()

if(!form.question.trim()){
alert("Question is required")
return
}

if(type === "mcq" && !form.answer.trim()){
alert("Correct answer required")
return
}

const res = await fetch("/api/question",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
...form,
type
})
})

const data = await res.json()

if(!res.ok){
alert(data.message || "Error")
return
}


// ADD NEW QUESTION TO LIST
setQuestions([data.question,...questions])


setForm({
question:"",
answer:"",
time:"",
marks:"",
})

setOpen(false)

}

return (

<div className="p-6 -mt-10">

<div className="flex justify-end mb-4">

<button
onClick={()=>setOpen(true)}
className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
Add Question
</button>

</div>


{/* Question List */}

<div className="space-y-4 ">

{questions.map((q,index)=>(

<div key={q._id || index} className="border p-4 rounded shadow">

<p className="font-semibold">{q.question}</p>

<p className="text-sm text-gray-600">
Type: {q.type}
</p>

{q.answer && (
<p className="text-sm text-gray-600">
Answer: {q.answer}
</p>
)}

<p className="text-sm text-gray-600">
Time: {q.time}
</p>

<p className="text-sm text-gray-600">
Marks: {q.marks}
</p>

</div>

))}

</div>


{/* Modal */}

{open && (

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

<div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">

<h2 className="text-xl font-semibold mb-4">
Create Question
</h2>

<form className="space-y-4" onSubmit={handleSubmit}>

<select
className="w-full border p-2 rounded"
value={type}
onChange={(e)=>setType(e.target.value)}
>
<option value="mcq">MCQ</option>
<option value="descriptive">Descriptive</option>
</select>

<input
name="question"
placeholder="Question"
className="w-full border p-2 rounded"
value={form.question}
onChange={handleChange}
/>

{type === "mcq" && (

<input
name="answer"
placeholder="Correct Answer"
className="w-full border p-2 rounded"
value={form.answer}
onChange={handleChange}
/>

)}

<input
name="time"
placeholder="Time (minutes)"
className="w-full border p-2 rounded"
value={form.time}
onChange={handleChange}
/>

<input
name="marks"
placeholder="Marks"
className="w-full border p-2 rounded"
value={form.marks}
onChange={handleChange}
/>

<div className="flex gap-3">

<button
type="submit"
className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
Save
</button>

<button
type="button"
onClick={()=>setOpen(false)}
className="bg-gray-400 text-white px-4 py-2 rounded"
>
Cancel
</button>

</div>

</form>

</div>

</div>

)}

</div>

)

}

export default Examination