import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type Alert } from "../types/types"

export type Store = {
    Alerts: Alert[],
    add: (alert: Alert) => void,
    remove: (id: string) => void,
    update: (id: string, alert: Alert) => void
}

export const useStore = create<Store>()(
    persist(
        (set, get) => {
            return {
                Alerts: [],
                add: (alert: Alert) => {
                    set({
                        Alerts: [...(get() as Store).Alerts, alert]
                    })
                },
                remove: (id: string) => set({ Alerts: (get() as Store).Alerts.filter(alert => alert.id !== id) }),
                update: (id: string, alert: Alert) => { 
                    // eslint-disable-next-line no-useless-assignment
                    let alertFind = (get() as Store).Alerts.find(alert => alert.id === id);
                    alertFind = alert;
                    return alertFind
                 },
    
            }
        },
        {
            name: 'alert-state',
        }
    )
)



