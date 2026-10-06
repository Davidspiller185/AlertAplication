import { useState } from "react";
import { useStore } from "../store/zustand.ts";
import { type Alert } from "../types/types.tsx";

export function SelectAlerts(){
    const alerts = useStore(state => state.Alerts)
    const [arena,setArena] = useState<string>("")
    const [priority, setPriority] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [allertByArena, setAllertByArena] = useState<Alert[]>([])
    const [alertByPriority, setAlertByPriority] = useState<Alert[]>([])

    const handlleSearchByArena = (arena:string) => {
        const alertsByArena = alerts.filter(Alert => Alert.arena === arena)
        if(alertsByArena.length){
            setAllertByArena(alertsByArena)
        }
        else(
            setError("not found alert by this arena")
        )
    }

    const handleAlertByPriority = (priority:string) => {
        const alertByPriority = alerts.filter(Alert => Alert.priority === priority)
        if(alertByPriority.length){
            setAlertByPriority(alertByPriority)
        }
        else{
            setError("not found alert with this priority")
        }
    }

    return (
        <>
        <input
         type="string"
         placeholder="Search by arene"
         value={arena}
         onChange={(e) => setArena(e.target.value)}
        />
        <button onClick={() => handlleSearchByArena(arena)}>
            Click to Search by arena
        </button>
        {error&& <p>{JSON.stringify(error)}</p>}
        {allertByArena && <p>{JSON.stringify(allertByArena)}</p>}
        <input 
        type="string"
        placeholder="Search by priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        />
        <button onClick={() => handleAlertByPriority(priority)}>
            Click to Search by priority
        </button>
        {error && <p>{JSON.stringify(error)}</p>}
        {alertByPriority && <p>alertByPriority</p>}
        
     </>
    )
}