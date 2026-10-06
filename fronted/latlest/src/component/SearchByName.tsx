import { useState } from "react";
import { useStore } from "../store/zustand.ts";
import { type Alert } from "../types/types.tsx";

export function SearchByName(){
    const alerts = useStore(state => state.Alerts)
    const [name,setName] = useState<string>("")
    const [alertsByName,setAlertsByName] = useState<Alert[]>([])
    const [error,setError] = useState<string>("")

    const handlleSearch = (name:string) =>{
        const alertsByName = alerts.filter(Alert => Alert.displayName.includes(name))
        if(alertsByName.length){
            setAlertsByName(alertsByName)
        }
        else(
            setError("not found alert include this name")
        )
        

    }

    return (
        <>
        <input 
            type="string"
            placeholder="search Alert"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <button onClick={() => handlleSearch(name)}>
            Click to Search
        </button>

        {alertsByName &&<p>{JSON.stringify(alertsByName)}</p>}
        {error &&<p>{JSON.stringify(error)}</p>}


        </>

    )
}