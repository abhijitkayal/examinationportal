import mongoose from "mongoose"

const MONGODB_URI = "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/examination_portal?retryWrites=true&w=majority&appName=HACKETHIC"

mongoose.set("strictQuery", true)

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {

  if (global.mongoose.conn) return global.mongoose.conn

  if (!global.mongoose.promise) {

    global.mongoose.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })

  }

  try {
    global.mongoose.conn = await global.mongoose.promise
  } catch (error) {
    global.mongoose.promise = null
    global.mongoose.conn = null
    throw error
  }

  return global.mongoose.conn
}