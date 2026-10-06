import express from "express"
import { getAlert, getAlertByid, postAlert, deleteAlert, putById } from "../controller/controller.js"

const router = express.Router()

router.get('/api/alerts', getAlert)

router.get('/api/alerts/:id',getAlertByid)

router.post('/api/alerts', postAlert)

router.delete('/api/alerts/:id', deleteAlert)

router.put('/api/alerts/:id',putById)

export default router