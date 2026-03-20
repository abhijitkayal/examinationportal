

// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import ChatBox from "@/app/component/chatBox.jsx"

// export default function Dashboard(){

// const router = useRouter()

// const [user,setUser] = useState(null)
// const [open,setOpen] = useState(false)

// const [questions,setQuestions] = useState([])
// const [current,setCurrent] = useState(0)

// const [answer,setAnswer] = useState("")
// const [answers,setAnswers] = useState([])

// const [time,setTime] = useState(0)

// const [showResult,setShowResult] = useState(false)
// const [startExam,setStartExam] = useState(false)
// const [hasSubmittedExam,setHasSubmittedExam] = useState(false)
// const [resultPublished,setResultPublished] = useState(false)
// const [chatOpen,setChatOpen] = useState(false)

// const [links,setLinks] = useState([])
// const [notifications,setNotifications] = useState([])
// const [topScorers, setTopScorers] = useState([])

// async function fetchLinksAndNotifications(userId){

// if(!userId) return

// const res = await fetch(`/api/link?userId=${userId}`)
// const data = await res.json()

// setLinks(data)

// const unread = data.filter((l)=>l.isNew)
// setNotifications(unread)

// }


// // FETCH USER
// useEffect(()=>{

// const userId = localStorage.getItem("userId")

// if(!userId){
// router.push("/login")
// return
// }

// fetch(`/api/auth/user?id=${userId}`)
// .then(res=>res.json())
// .then((data)=>{
// setUser(data)
// fetchLinksAndNotifications(data?._id)
// })

// },[router])


// // FETCH QUESTIONS
// useEffect(()=>{

// fetch("/api/question")
// .then(res=>res.json())
// .then(data=>{

// setQuestions(data)

// if(data.length > 0){
// setTime(data[0].time *60)
// }

// })

// },[])
// useEffect(() => {
//   async function fetchTopScorers() {
//     const res = await fetch("/api/result")
//     const data = await res.json()
//     console.log("hi");
//     // 🔥 HANDLE DIFFERENT RESPONSE TYPES
//     console.log("Raw Result Data:", data)
//     let results = []

// if (Array.isArray(data)) {
//   results = data
// } else if (Array.isArray(data.data)) {
//   results = data.data
// } else if (data && data._id) {
//   results = [data] // 🔥 SINGLE OBJECT FIX
// }
//     console.log(results)

//     if (results.length === 0) return

//     const maxScore = Math.max(...results.map((r) => r.score))

//     const toppers = results.filter((r) => r.score === maxScore)
//     console.log("Top Scorers:", toppers)

//     setTopScorers(toppers)
//   }

//   fetchTopScorers()
// }, [])


// // NEXT QUESTION
// function nextQuestion(){

// if(!questions[current]) return

// const updatedAnswers = [
// ...answers,
// {
// question: questions[current].question,
// answer: answer
// }
// ]

// setAnswers(updatedAnswers)

// if(current < questions.length - 1){

// const next = current + 1

// setCurrent(next)
// setAnswer("")
// setTime(questions[next].time * 60)

// }else{

// setShowResult(true)
// calculateResult(updatedAnswers)

// }

// }


// // CALCULATE RESULT
// async function calculateResult(submittedAnswers){

// let score = 0
// let totalMarks = 0

// questions.forEach((q,index)=>{

// totalMarks += q.marks

// if(
// submittedAnswers[index]?.answer?.trim().toLowerCase() ===
// q.answer?.trim().toLowerCase()
// ){
// score += q.marks
// }

// })

// const email = user?.email

// await fetch("/api/result",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({
// email,
// score,
// totalMarks,
// answers:submittedAnswers
// })
// })

// setShowResult(true)
// setHasSubmittedExam(true)

// }


// // TIMER
// useEffect(()=>{

// if(showResult || questions.length === 0) return

// if(time === 0){
// setTimeout(()=>nextQuestion(),0)
// return
// }

// const timer = setInterval(()=>{
// setTime(prev => prev - 1)
// },1000)

// return ()=> clearInterval(timer)

// },[time])


// // CHECK RESULT PUBLISHED
// useEffect(()=>{

// if(!user?.email) return

// fetch(`/api/result?email=${user.email}`)
// .then(res=>res.json())
// .then(data=>{
// if(data?._id){
// setHasSubmittedExam(true)
// }
// if(data?.isPublished){
// setResultPublished(true)
// }
// })

// },[user])


// // MARK AS READ
// const markAsRead = async ()=>{

// if(!user?._id) return

// await fetch("/api/link",{
// method:"PATCH",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({ userId:user._id })
// })

// setNotifications([])

// setLinks((prev)=>prev.map((item)=>({
// ...item,
// isNew:false
// })))

// }


// // LOGOUT
// const logout = ()=>{
// localStorage.removeItem("userId")
// router.push("/login")
// }


// return(

// <div className="min-h-screen bg-gray-100">

// {/* NAVBAR */}
// <div className="flex justify-between items-center bg-white shadow px-6 py-4">

// <h1 className="text-xl font-bold">Dashboard</h1>

// <div className="flex items-center gap-4">

// {/* 🔔 NOTIFICATION */}
// <div className="relative group cursor-pointer">

// <div className="text-xl relative">
// 🔔

// {notifications.length > 0 && (
// <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
// {notifications.length}
// </span>
// )}

// </div>

// <div className="absolute right-0 mt-2 w-64 bg-white shadow rounded p-4 
// opacity-0 invisible group-hover:visible group-hover:opacity-100 transition z-50">

// <h3 className="font-bold mb-2">Notifications</h3>

// {notifications.length === 0 ? (
// <p className="text-sm text-gray-500">No new notifications</p>
// ) : (
// <div className="space-y-2 max-h-40 overflow-y-auto">
// {notifications.map((n)=>(
// <div key={n._id} className="border p-2 rounded text-sm">
// 📚 {n.title}
// </div>
// ))}
// </div>
// )}

// <button
// onClick={markAsRead}
// className="mt-3 w-full bg-blue-600 text-white py-1 rounded"
// >
// Mark as Read
// </button>

// </div>

// </div>
// {topScorers.length > 0 && (
//   <div className="mb-4 bg-yellow-100 border border-yellow-300 p-3 rounded">

//     <h3 className="font-bold text-yellow-700 mb-2">
//       🏆 Top Scorer{topScorers.length > 1 ? "s" : ""}
//     </h3>

//     {topScorers.map((t, index) => (
//       <div key={index} className="text-sm">

//         <p><b>Email:</b> {t.email}</p>
//         <p><b>Score:</b> {t.score}</p>

//       </div>
//     ))}

//   </div>
// )}


// {/* PROFILE */}
// <div className="relative">

// <div
//   onClick={() => setOpen(!open)}
//   className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer font-bold"
// >
//   {user?.email?.charAt(0).toUpperCase() || "U"}
// </div>

// {open && (
// <div className="absolute right-0 mt-2 w-60 bg-white border rounded shadow-lg p-4">

// <p className="text-sm text-gray-500">Role</p>
// <p className="font-medium mb-2">{user?.role}</p>

// <p className="text-sm text-gray-500">Email</p>
// <p className="font-medium mb-3">{user?.email}</p>

// <button
// onClick={logout}
// className="w-full bg-red-500 text-white py-2 rounded"
// >
// Logout
// </button>

// </div>
// )}

// </div>

// </div>
// </div>


// {/* MAIN GRID */}
// <div className="grid grid-cols-3 gap-6 p-6">

// {/* EXAM */}
// <div className="flex items-center justify-center h-[85vh]">

// {!startExam ? (

// <div className="bg-white p-10 rounded shadow w-[400px] text-center">

// <h2 className="text-2xl font-bold mb-4">Online Examination</h2>

// {!resultPublished && !hasSubmittedExam && (
//   <button
//     onClick={() => window.open("/dashboard/student?exam=1","_blank")}
//     className="bg-blue-600 text-white px-6 py-2 rounded"
//   >
//     Start Exam
//   </button>
// )}

// {hasSubmittedExam && (
//   <p className="text-sm text-gray-600">You have already submitted the exam. Wait for result.</p>
// )}

// </div>

// ) : showResult ? (

// <div className="bg-white p-10 rounded shadow w-[700px]">
// <h2 className="text-2xl font-bold mb-6">Your Answers</h2>

// {answers.map((item,index)=>(
// <div key={index} className="mb-4 border-b pb-3">
// <p className="font-semibold">Q{index+1}: {item.question}</p>
// <p className="text-blue-600">Your Answer: {item.answer || "No Answer"}</p>
// </div>
// ))}

// </div>

// ) : (

// questions[current] && (

// <div className="bg-white p-10 rounded shadow w-[700px]">

// <div className="flex justify-between mb-6">

// <h2>Question {current + 1}</h2>

// <p className="text-red-600">
// {Math.floor(time/60)}:{time%60}
// </p>

// </div>

// <p>{questions[current].question}</p>

// <input
// value={answer}
// onChange={(e)=>setAnswer(e.target.value)}
// className="w-full border p-3 rounded"
// />

// <button onClick={nextQuestion} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
// Next
// </button>

// </div>

// )

// )}

// </div>


// {/* RESULT */}
// <div className="flex items-center justify-center h-[85vh]">

// {resultPublished && (
// <div className="bg-white p-10 rounded shadow w-[400px] text-center">

// <h2 className="text-2xl font-bold mb-4">Result Available</h2>

// <button
// onClick={()=>router.push("/result")}
// className="bg-green-600 text-white px-6 py-2 rounded"
// >
// Show Result
// </button>

// </div>
// )}

// </div>


// {/* STUDY MATERIAL */}
// <div className="flex flex-col gap-6 items-center justify-center h-[85vh]">

// <div className="bg-white p-6 rounded shadow w-[350px]">

// <h2 className="text-xl font-bold mb-4">Study Materials</h2>

// <div className="space-y-3 max-h-[300px] overflow-y-auto">

// {links.map((l)=>(
// <div key={l._id} className="border p-3 rounded">

// <p className="font-semibold">{l.title}</p>

// <a href={l.url} target="_blank" className="text-blue-600 underline">
// Open Link
// </a>

// </div>
// ))}

// </div>

// </div>

// </div>

// </div>


// {/* CHAT */}
// <button
// onClick={()=>setChatOpen(!chatOpen)}
// className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full"
// >
// Chat
// </button>

// {chatOpen && <ChatBox user={user} />}

// </div>

// )

// }


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import ChatBox from "@/app/component/chatBox.jsx"
import logo from "./WhatsApp Image 2026-03-18 at 9.04.15 PM.jpeg"

export default function Dashboard(){

  const router = useRouter()

  const [user,setUser] = useState(null)
  const [open,setOpen] = useState(false)
  const [activeTab,setActiveTab] = useState("dashboard")

  const [hasSubmittedExam,setHasSubmittedExam] = useState(false)
  const [resultPublished,setResultPublished] = useState(false)

  const [links,setLinks] = useState([])
  const [notifications,setNotifications] = useState([])
  const [topScorerEmail,setTopScorerEmail] = useState("")

  const [chatOpen,setChatOpen] = useState(false)
  const [showTopModal, setShowTopModal] = useState(false)

  // ---------------- FETCH USER ----------------
  useEffect(()=>{
    const userId = localStorage.getItem("userId")

    if(!userId){
      router.push("/login")
      return
    }

    fetch(`/api/auth/user?id=${userId}`)
      .then(res=>res.json())
      .then((data)=>{
        setUser(data)
        fetchLinksAndNotifications(data?._id)
      })

  },[router])

  // ---------------- FETCH LINKS ----------------
  async function fetchLinksAndNotifications(userId){
    if(!userId) return

    const res = await fetch(`/api/link?userId=${userId}`)
    const data = await res.json()

    setLinks(data)
    setNotifications(data.filter((l)=>l.isNew))
  }

  // ---------------- CHECK RESULT ----------------
  useEffect(()=>{
    if(!user?.email) return

    fetch(`/api/result?email=${user.email}`)
      .then(res=>res.json())
      .then(data=>{
        if(data?._id){
          setHasSubmittedExam(true)
        }
        if(data?.isPublished){
          setResultPublished(true)
        }
      })
  },[user])
  
useEffect(()=>{

fetch("/api/result?top=1")
.then(res=>res.json())
.then(data=>{
if(data?.email){
setTopScorerEmail(data.email)
}
})

},[])

  // ---------------- LOGOUT ----------------
  const logout = ()=>{
    localStorage.removeItem("userId")
    router.push("/login")
  }

  return(

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md p-4">

        {/* <h2 className="text-xl font-bold mb-6">Dashboard</h2> */}
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

        <div className="flex flex-col gap-2">

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => setActiveTab("study")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "study"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            📚 Study Material
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* NAVBAR */}
        <div className="flex justify-between items-center bg-white shadow px-6 py-4 rounded-xl mb-6">

          <h1 className="text-xl font-bold capitalize">Examination-Portal {activeTab}</h1>

          {/* AVATAR */}
          <div className="relative">

            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer font-bold"
            >
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-60 bg-white border rounded shadow-lg p-4 z-50">

                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium mb-3">{user?.email}</p>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium mb-3">{user?.role}</p>

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

        {/* TAB CONTENT */}

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          
          <div className="flex items-center justify-center h-[70vh]">
            <button
  onClick={() => setShowTopModal(true)}
  className="fixed top-24 right-6 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg"
>
  🏆 Top Scorer
</button>
{showTopModal && resultPublished && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

    <div className="bg-white p-6 rounded shadow w-[400px] relative text-center">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowTopModal(false)}
        className="absolute top-2 right-2 text-red-500 text-lg"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-4">🏆 Top Scorer</h2>

      {resultPublished ? (
        topScorerEmail ? (
          <>
            <p className="text-gray-500 mb-2">Highest Score Email</p>
            <p className="font-semibold text-blue-600 break-all">
              {topScorerEmail}
            </p>
          </>
        ) : (
          <p className="text-gray-500">No data available</p>
        )
      ) : (
        <p className="text-gray-500">Result not published yet</p>
      )}

    </div>
  </div>
)}
            <div className="bg-white p-10 rounded shadow w-[400px] text-center">

              <h2 className="text-2xl font-bold mb-4">
                Online Examination
              </h2>
             


              {!resultPublished && !hasSubmittedExam && (
                <button
                  onClick={() => window.open("/dashboard/student?exam=1","_blank")}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Start Exam
                </button>
              )}

              {hasSubmittedExam && (
                <p className="text-gray-600 text-sm">
                  You already submitted the exam. Wait for result.
                </p>
              )}

            </div>

          </div>
        )}

        {/* STUDY MATERIAL TAB */}
        {activeTab === "study" && (
          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold mb-4">Study Materials</h2>

            {links.length === 0 ? (
              <p className="text-gray-500">No materials available</p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {links.map((l)=>(
                  <div key={l._id} className="border p-3 rounded">

                    <p className="font-semibold">{l.title}</p>

                    <a
                      href={l.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Open Link
                    </a>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* CHAT */}
      <button
        onClick={()=>setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full"
      >
        Chat
      </button>

      {chatOpen && <ChatBox user={user} />}

    </div>
  )
}