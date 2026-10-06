import { Asterisk } from "lucide-react";
import { AlertCollection } from "../db/db.js";
import { ObjectId, ReturnDocument } from "mongodb";


export async function repoAllAlert() {
    try{
    const AllAlert =  await AlertCollection.find().toArray()
    return AllAlert
    }
    catch(err){
        throw(err)
    }
}

export async function  repoAlertById(id) {
    try{
        const AlertById = AlertCollection.findOne({_id:new ObjectId(id)})
        return AlertById
    }
    catch(err){
        throw(err)
    }
}

export async function  repoPost(body) {
    try{
        const result = await AlertCollection.insertOne(body)
        return {
            _id: String(result.insertedId),
            ...body
        }
    }
    catch(err){
        throw(err)
    }
}

export async function repoDelete(id) {
    try{
      return await AlertCollection.deleteOne({id:id})
    
    }
    catch(err){
        throw(err)
    }
}

export async function repoPut(id,body) {
    try{
        const put = await AlertCollection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set: body},
            {returnDocument: "after"}
        )
        return put
    }
    catch(err){
        throw(err)
    }
}
