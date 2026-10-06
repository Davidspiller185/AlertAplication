import { useState, type ChangeEvent } from "react";
import {  type Alert } from "../types/types";
import  {useStore}  from "../store/zustand.ts"
import AlertsMap from "./AlertsMap.tsx";

export function AddAlert(){
    const addAlert = useStore(state => (state as {add: (alert:Alert) => void}).add)
    const alerts = useStore(state => state.Alerts)
    const [displayName, setDisplayName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [priority, setPriority] = useState<string>("")
    const [arena, setArena] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [lon, setLon] = useState<number>()
    const [lat, setLat] = useState<number>()
    const [error, setError] = useState<string>("")
    
    const handeleAddAlert = (e:SubmitEvent) => {
            e.preventDefault()
            fetch('http://localhost:3000/api/alerts',{
                method: "POST",
                headers: {
                    "content-Type":"application/json"
                },
                body: JSON.stringify({
                    displayName,
                    description,
                    priority,
                    arena,
                    status,
                    lon,
                    lat
                })

            }
                
            )
            .then(response =>{if(!response.ok){throw new Error("failed to make fetch to add alert")} return response.json()})
            .then(data => addAlert(data.data))
            .catch(err => setError(err))
      }

      return (
        <>
        <form onSubmit={() => handeleAddAlert }>
            <input
            required
                type="string"
                placeholder="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
            required 
                type="string"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>

            </select>
           <select onChange={(e) => setArena(e.target.value)}>
            <option>North</option>
            <option>South</option>
            <option>Center</option>
           </select>

           <select onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Handled</option>
           </select>

            <input
            required 
                type= "number"
                placeholder="lon"
                value={lon}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLon(Number(e.target.value))}
            />
            <input
            required 
                type="number"
                placeholder="lat"
                value={lat}
                onChange={(e:ChangeEvent<HTMLInputElement>) => setLat(Number(e.target.value))}
            />

            <button>
                Submit
            </button>
        </form>
        <AlertsMap alerts={alerts} />
        {error && <p>{JSON.stringify(error)}</p>}
        
        </>
      )
}