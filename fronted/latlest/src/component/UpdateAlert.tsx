import { useState, type ChangeEvent } from "react";
import { useStore } from "../store/zustand.ts";
import type { Alert } from "../types/types";
import { useParams } from "react-router-dom";
import AlertsMap from "./AlertsMap.tsx";

export function UpdateAlert() {
    const update = useStore((state => (state as { update: (id: string, alert: Alert) => void }).update))
    const alerts = useStore(state => state.Alerts)
    const [error, setError] = useState<string>("")
    const { id } = useParams()
    const [alert, setAlert] = useState<Alert>({id:"",displayName:"",description:"",priority:"",arena:"",status:"",lon:0,lat:0})
    const [displayName, setDisplayName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [priority, setPriority] = useState<string>("")
    const [arena, setArena] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [lon, setLon] = useState<number>(0)
    const [lat, setLat] = useState<number>(0)


    const handleUpdate = (e:SubmitEvent) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/alerts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alert)
        })
            .then(response => { if (!response.ok) { throw new Error("failed to fetch to make update") }return response.json() })
            .then(data => update(String(id), data))
            .catch(error => setError(error))
    }

    return (
        <>
            <form onSubmit={() => handleUpdate}>
                <input

                    type="string"
                    placeholder="displayName"
                    value={displayName}
                    onChange={(e) => {setDisplayName(e.target.value)}}
                />
                <input

                    type="string"
                    placeholder="description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value)}} 
                />
                <input

                    type="string"
                    placeholder="priority"
                    value={priority}
                    onChange={(e) => {setPriority(e.target.value)}}
                />
                <input

                    type="string"
                    placeholder="arena"
                    value={arena}
                    onChange={(e) => {setArena(e.target.value)}}
                />
                <input

                    type="string"
                    placeholder="status"
                    value={status}
                    onChange={(e) => {setStatus(e.target.value)}}
                />
                <input

                    type="number"
                    placeholder="lon"
                    value={lon}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setLon(Number(e.target.value))}}
                />
                <input

                    type="number"
                    placeholder="lat"
                    value={lat}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setLat(Number(e.target.value))}}
                />

                <button onClick={() => setAlert({id:String(id),displayName,description,priority,arena,status,lon,lat})}>
                    Submit Update
                </button>
            </form>
            <AlertsMap alerts={alerts} />
            {error && <p>{JSON.stringify(error)}</p>}


        </>
    )




}