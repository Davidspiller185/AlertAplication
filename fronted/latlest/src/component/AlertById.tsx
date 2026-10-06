import { useEffect, useState } from "react";
import {type Alert } from "../types/types";
import { useParams } from "react-router-dom";

export function AlertById(){
    const [alert,setAlert] = useState<Alert>(
        {id:"",displayName:"",description:"",priority:"",arena:"",status:"",lon:0,lat:0})
    const [error, seterror] = useState<string>("")
    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:3000/api/alerts/${id}`)
        .then(responce =>{if(!responce.ok){throw new Error("fetch failed to get alert by id")} return responce.json()})
        .then(data => setAlert(data))
        .catch(error => seterror(error))
    },[id])
    
    return (
        <>
        {alert&&<p>{JSON.stringify(alert)}</p>}
        {error && <p>{JSON.stringify(error)}</p>}
        </>
    )
}