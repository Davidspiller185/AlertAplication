import { fa, tr } from "zod/v4/locales"
import { ValidPost,ValidPut } from "../schema/schema.js"
import  {success}  from "zod"
import { data } from "react-router"
import { serviceAlertById,serviceAllAlert,servicePost,serviceDelete,putService } from "../service/service.js"

export async function getAlert(req,res,next) {
    try{
        const allAlert = await serviceAllAlert()
        if(!allAlert.length){
            return res.status(404).json({success:false, message: "not found any alert"})
        }
        res.status(200).json({succsses: true, data: allAlert})
    }
    catch(err){
        next(err)
    }
}

export async function getAlertByid(req,res,next) {
    try{
        const {id} = req.params
        const AlertById = await serviceAlertById(id)
        if(!AlertById){
            return res.status(404).json({success:false, message: "not found allert with this id"})
        }
        res.status(200).json({succsses: true, data: AlertById})
    }
    catch(err){
        next(err)
    }
}

export async function postAlert(req,res,next) {
    try{
        const body = req.body
        console.log(body)
        if(!body){
            return res.status(400).json({succsses:false, message: "must to send body"})
        }
        const valid = ValidPost.safeParse(body)
        console.log(valid)

        if(!valid.success){
            return res.status(400).json({succsses:false, message: "must to send the correct schema of body"})
        }

        const result = await servicePost(body)
        res.status(201).json({succsses:true, data: result})

    }
    catch(err){
        next(err)
    }
}

export async function deleteAlert(req,res,next) {
    try{
        const {id} = req.params
        const Find = serviceAlertById(id)
        if(!Find){
            return res.status(404).json({success:false, message: "not found this id"})
        }
        await serviceDelete(id)
        res.status(200).json({success:true, message: "succsses to delete alert"})
    }
    catch(err){
        next(err)
    }
}

export async function putById(req,res,next) {
    try{
        const {id} = req.params
        const body = req.body
         if(!body){
            return res.status(400).json({succsses:false, message: "must to send body"})
        }

        const valid = ValidPut.safeParse(body)
        if(!valid.success){
            return res.status(400).json({succsses:false, message: "must to be the correct body"})
        }
        const Find = serviceAlertById(id)
        if(!Find){
            return res.status(404).json({success:false, message: "not found this id"})
        }
        const put = await putService(id,body)
        res.status(200).json({success:true,data:put })

    }
    catch(err){
        next(err)
    }
}
