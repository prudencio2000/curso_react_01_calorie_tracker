import { Activity } from "../types"

export type ActivityActions =
    { type: "save-activity", payload: { newActivity: Activity } } |
    { type: "set-activeId", payload: { id: Activity['id'] } } |
    { type: "detele-activity", payload: { id: Activity['id'] } } |
    { type: "restart-app" }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']

}

const localStorageActivities = (): Activity[]=>{
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : []
}
export const initalState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (state: ActivityState = initalState, action: ActivityActions) => {
    if (action.type === "save-activity") {
        let updateActiveties: Activity[] = []
        if (state.activeId) {
            updateActiveties = state.activities.map(activity => activity.id == state.activeId ? action.payload.newActivity : activity)

        } else {
            updateActiveties = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updateActiveties,
            activeId: ''
        }
    }
    if (action.type === "set-activeId") {
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    if(action.type === "detele-activity"){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }
    if (action.type === "restart-app") {
        return {
            activities: [],
            activeId: ''
        }
    }
    return state

}