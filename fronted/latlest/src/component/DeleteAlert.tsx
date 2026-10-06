import { useState } from "react";
import {useParams } from "react-router-dom";
import { useStore } from "../store/zustand.ts";
import AlertsMap from "./AlertsMap.tsx";



export function DeleteAlert(){
    const [error,setError] = useState<string>("")
    const alerts = useStore(state => state.Alerts)
    const remove = useStore(state => (state as {remove: (id:string) => void}).remove)
    const {id} = useParams()

    const handdleDeleted = () => {
        fetch(`http://localhost:3000/api/alerts/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response =>{if(!response.ok){throw new Error("failed fetch to deleted")} return response.json()})
        .then(data => remove(data))
        .catch(error => setError(error))
    }

    return (
        <>
        <button onClick={handdleDeleted}>
            Delete Alert
        </button>
        <AlertsMap alerts={alerts} />
        {error && <p>{JSON.stringify(error)}</p>}
      </>
    )


}