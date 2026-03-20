import { connectDB } from "@/lib/db"
import Question from "@/models/Question"

export async function GET(){

await connectDB()

const questions = await Question.find().sort({createdAt:-1})

return Response.json(questions)

}

export async function POST(req){

await connectDB()

const body = await req.json()

const question = await Question.create(body)

return Response.json({
message:"Question saved successfully",
question
})

}