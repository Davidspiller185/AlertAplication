import { MongoClient } from "mongodb";
// import "dotenv/config"

const client = new  MongoClient(process.env.MONGO_URI)

await client.connect()

const db = client.db("AlertAttackSistem")

export const AlertCollection = db.collection("Alert")
