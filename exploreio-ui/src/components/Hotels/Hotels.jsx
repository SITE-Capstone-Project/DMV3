import React from "react"
import { useState } from "react"
import "./Hotels.css"

export default function Hotels({hotels}) {
    return (
        <div className = "hotels-list">
            <h2 className = "hotels-title"> Hotels </h2>
            {hotels?.length != 0 && 
            (<div>
                {hotels?.map((element, index) => {
                    return <HotelCard 
                    key = {element + index}
                    name = {element.name}
                    rating = {element.rating}
                    priceLevel = {element.price_level}
                    description = {element.description}
                    web_url = {element.web_url}/>
                })}
            </div>)}

        </div>
    )
}

export function HotelCard({name, priceLevel, rating, description, web_url}) {
    const[isHover, setIsHover] = useState(false)

    const formatString = (string, num) => {
        let formatted = string
        if (formatted?.length <= num) {
        } else {
            formatted = string?.substring(0, num)
            if (formatted?.charAt(formatted.length - 1) == " ") {
                formatted = string?.substring(0, num - 1)
            }
            formatted += ".."
        }

        return formatted
    }

    return (
        <div className = "hotel-card" onMouseEnter = {() => { setIsHover(true)}} onMouseLeave={() => {setIsHover(false)}}>
            {isHover && (
                <div className = "popup-description">
                    <p id = "hotel-title-popup"> {name} </p>
                    <p> {description} </p>
                </div>
            )}
            <div className = "hotel-intro">
                <p id = "hotel-title"> 
                <a href={web_url}> {formatString(name, 17)} </a>
                </p>
            </div>
            <div className = "hotel-details">
            <p id = "hotel-pricerange"> {priceLevel} </p>
                <img id = "rating-star" src={`https://purepng.com/public/uploads/large/purepng.com-green-starstargeometricallydecagonconcavestardomclipartgreen-1421526503700o6cix.png`}/>
                <p id = "hotel-rating"> {rating} </p>
                <p id = "description"> {formatString(description, 20)}</p>
            </div>
        </div>
    )
}