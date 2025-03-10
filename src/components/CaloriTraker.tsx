import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CaloriTrakerProps = {
    activities: Activity[]
}
export default function CaloriTraker({ activities }: CaloriTrakerProps) {
    const caloriesCosumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.colories : total, 0), [activities])
    const caloriesBurned= useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.colories : total, 0), [activities])
    const netCalories = useMemo (()=> caloriesCosumed-caloriesBurned ,[activities])
    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>
            <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay calories={caloriesCosumed} text="Consumidas"/>
                <CalorieDisplay calories={caloriesBurned} text="Ejercicio"/>
                <CalorieDisplay calories={netCalories} text="Diferencia"/>
            </div>

        </>
    )
}
