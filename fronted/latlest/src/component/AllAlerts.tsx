
import { useEffect, useState } from "react";
import {  type Alert } from "../types/types.tsx";

export function AllAlerts(){
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [error,setError] = useState<string>("")

    useEffect(() => {
        fetch('http://localhost:3000/api/alerts')
        .then(response =>{if(!response.ok) {throw new Error("failed fetch to get all the alerts")} return response.json()})
        .then(data => setAlerts(data.data))
        .catch(error => setError(error))
    },[])
    console.log(alerts)
    return (
        <>
        {alerts.map((alert, index) => (
                <div key={index}>
                    <p>{alert.id}</p>
                    <p>{alert.displayName}</p>
                    <p>{alert.description}</p>
                    <p>{alert.priority}</p>
                    <p>{alert.arena}</p>
                    <p>{alert.status}</p>
                    <p>{alert.lon}</p>
                    <p>{alert.lat}</p>
                </div>
        ))}
        {error && <p>{JSON.stringify(error)}</p>}
        
        </>
) 
}       
