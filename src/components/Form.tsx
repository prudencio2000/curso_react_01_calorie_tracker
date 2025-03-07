import { use, useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { categories } from "../data/category";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FromProps= {
    dispatch: React.Dispatch<ActivityActions>
    state : ActivityState
}

export default function Form({dispatch, state}: FromProps) {
    const initalActivity: Activity = {
        id : uuidv4(),
        category: 1,
        name: '',
        colories: 0
    }
    const [activity, setActivity] = useState<Activity>(initalActivity);
    useEffect(() => {
        if (state.activeId) {
           const selectActivity = state.activities.filter(setActivity => setActivity.id === state.activeId)[0];
           setActivity(selectActivity);
        }
    }, [state.activeId])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const isNumberField = ['category', 'colories'].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value,
        })
    }

    const isValidActivity = () => {
        const {name, colories} = activity;
        return name.trim() !== '' && colories > 0;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save-activity', payload: {newActivity: activity}});
        setActivity(
            {
                ...initalActivity,
                id: uuidv4(),
            }
        )
    }

    return (
        <form
            className="space-y-5 bg-white p-10 rounded-lg shadow"
            onSubmit={e=>handleSubmit(e)}
        >
            <div className="grid gird-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={e => handleChange(e)}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}

                </select>
            </div>
            <div className="grid gird-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    value={activity.name}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio , Pesas, Biciclestas"
                    onChange={e => handleChange(e)}
                />
            </div>
            <div className="grid gird-cols-1 gap-3">
                <label htmlFor="colories" className="font-bold">Calorias:</label>
                <input
                    id="colories"
                    type="number"
                    value={activity.colories}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Calorias ej. 200 o 300"
                    onChange={e => handleChange(e)}
                />
            </div>
            <input
                type="submit"
                value={activity.category===1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                className="bg-gray-800 hover:bg-gray-900  w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                disabled={!isValidActivity()}
            >
            </input>
        </form>
    )
}
