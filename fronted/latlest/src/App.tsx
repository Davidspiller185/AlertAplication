import { Route, Routes } from "react-router-dom";
import { AddAlert } from "./component/AddAlert.tsx";
import { AlertById } from "./component/AlertById.tsx";
import AlertsMap from "./component/AlertsMap.tsx";
import { useStore } from "./store/zustand.ts";
import { AllAlerts } from "./component/AllAlerts.tsx";
import { DeleteAlert } from "./component/DeleteAlert.tsx";
import { SearchByName } from "./component/SearchByName.tsx";
import { SelectAlerts } from "./component/SelectAlerts.tsx";




export  default function App(){
    const alerts = useStore(state => state.Alerts)
    return (
        <Routes>
            <Route path="/addAlert" element={<AddAlert />} />
            <Route path="/findAlert/:id" element={<AlertById />} />
            <Route path="/alertMap" element={<AlertsMap alerts={alerts} />} />
            <Route path="/allAlerts" element={<AllAlerts />} />
            <Route path="/deleteAlert" element={<DeleteAlert />} />
            <Route path="/SearchByName" element={<SearchByName />} />
            <Route path="/SelectAlerts" element={<SelectAlerts />} />

        </Routes>
    )
}