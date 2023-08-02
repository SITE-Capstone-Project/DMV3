import "./Activities.css"
import React from "react"
import { useState, useEffect } from "react"
import { addActivity, deleteActivity } from "../../utilities/apiClient"

export default function Activities({ destinationid, activities, favorite, isLoggedIn, loadedFavorites }) {    
    return (
        <div className = "activities-card">
            <h2 className = "activities-title">Activities</h2>
            {activities?.map((element, index) => {
                return <ActivityCard 
                key = {element + index}
                activity = {element}
                favorite = {favorite}
                destinationid = {destinationid}
                loadedFavorites = {loadedFavorites}
                isLoggedIn = {isLoggedIn}/>
            })}
        </div>
    )
}

export function ActivityCard({ destinationid, activity, favorite, isLoggedIn, loadedFavorites }) {
    const[canAddActivity, setActivity] = useState(false)

    const checkActivity = async function() {
        try {
            const response = loadedFavorites
            for (let i = 0; i < response?.length; i++) {
                if (response[i]?.destination?.destinationid === destinationid) {
                    let destActivities = response[i]?.activities
                    if (destActivities?.length != 0) {
                        for (let j = 0; j < destActivities.length; j++) {
                            let activInfo = JSON.parse(destActivities[j]?.activityinfo)
                            if (activInfo?.info === activity) {
                                setActivity(false)
                                break;
                            } else {
                                setActivity(true)
                            }
                        }
                    } else setActivity(true)
                }
            }
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const addActivityToFavorite = async function() {
        const cardInfo = {type: "activity", info: activity}
        const body = {id: destinationid, activityinfo: JSON.stringify(cardInfo)}
        try {
            const response = await addActivity(body)
            setActivity(false)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const removeActivityFromFavorite = async function() {
        const cardInfo = {type: "activity", info: activity}
        const body = {id: destinationid, activityinfo: JSON.stringify(cardInfo)}
        try {
            const response = await deleteActivity(body)
            setActivity(true)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkActivity()
    }, [favorite])

    return (
        <div className = "activity-card">
            <p id = "activity"> {activity} </p>
            {isLoggedIn ? (
                <div>
                    {favorite ? (
                        <div> </div>
                    ) : (
                        canAddActivity ? (
                            <button id = "add-activity" onClick = {addActivityToFavorite}> Add Activity </button>
                        ) : (
                            <button id = "remove-activity" onClick = {removeActivityFromFavorite}> Remove Activity </button>
                        )
                    )}
                </div>
            ) : (<div></div>)}

        </div>
    )
}