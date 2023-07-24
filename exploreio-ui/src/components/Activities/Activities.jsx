import "./Activities.css"
import React from "react"

export default function Activities({activities}) {
    return (
        <div className = "activities-card">
            <h2 className = "activities-title">Activities</h2>
            {activities?.map((element, index) => {
                return <ActivityCard 
                key = {element + index}
                activity = {element}/>
            })}
        </div>
    )
}

export function ActivityCard({activity}) {
    return (
        <div className = "activity-card">
            <p id = "activity"> {activity} </p>
        </div>
    )
}