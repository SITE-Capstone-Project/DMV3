import React from "react"
import { useState, useEffect } from "react"
import { getFlight } from "../../utilities/apiClient"
import "./FlightForm.css"

export default function FlightForm({area, isFetching}) {
    const[flights, setFlights] = new useState(undefined)
    const[fetching, setFetching] = new useState(false)
    const[startDate, setStartDate] = new useState(new Date().toLocaleDateString('fr-ca'))
    const[endDate, setEndDate] = new useState(undefined)
    const[kids, setKids] = new useState([])

    const[form, setForm] = new useState({
        IATA:"",
        destination:"",
        departDate:"",
        returnDate:"",
        numAdults:0,
        children:0,
        cabin_class:"economy"
    })

    useEffect(() => {
        setEndDate(startDate)
    }, [startDate])

    useEffect(() => {
        let array = new Array(form.children != "" ? parseInt(form.children) : 0)
        array.fill(0)
        setKids(array)
    }, [form.children])

    const handleChange = async function(event) {
        event.preventDefault()
        setEndDate(event.target.value)
        setForm({...form, [event.target.name]:event.target.value})
    }

    const handleFormChange = async function(event) {
        if (event.target.name === "children" && parseInt(event.target.value) > 5) {
        } else {
            event.preventDefault()
            setForm({...form, [event.target.name]:event.target.value})
        }
    }

    const updateKidsArray = async function(event) {
        event.preventDefault()
        let current = [...kids]
        current[event.target.name] = event.target.value != "" ? parseInt(event.target.value): 0
        setKids(current)
    }

    const submitForm = async function(event) {
        event.preventDefault()
        let request = {
            IATA:form.IATA,
            destination: area,
            departDate:form.departDate,
            returnDate:form.returnDate,
            numAdults:form.numAdults,
            children:kids,
            cabin_class:form.cabin_class            
        }

        const response = await sendFlightRequest(request)
        return response
    }

    const sendFlightRequest = async function(request) {
        try {
            setFetching(true)
            const response = await getFlight(request)
            setFlights(response)
            return response
        } catch (error) {
            console.log(error)
        } finally {
            setFetching(false)
        }
    }

    return (
        <div className = "flight-form">
            <div className = "flight-top-part">
            <h2 className = "flights-title">Flights</h2>
            {fetching ? (
                <img className = "loading-flights" src="https://thumbs.gfycat.com/ImprobablePertinentGraysquirrel-size_restricted.gif"/>
            ):(
                    <div></div>
            )}
            </div>
            {isFetching ? (
                <div></div>
            ) : (
                <div>
                    
                {flights ? (
                    <div>
                        {flights.map((flight, index) => {
                            return <FlightCard key = {flight + index} flight = {flight}/>
                        })}
                    </div>
                ):(
                    <form id = "request-form">
                        <div>
                            <label> Origin airport IATA: </label>
                            <input type = "text"
                            name = "IATA"
                            placeholder = "Enter 3-letter IATA code"
                            value = {form.IATA}
                            onChange = {handleFormChange}/>

                            <div className = "flight-dates">
                                <div id = "depart-date">
                                    <label>Departure Date:</label>
                                    <input type = "date" 
                                    min = {startDate} 
                                    name ="departDate"
                                    value = {form.departDate}
                                    onChange = {handleChange}/>
                                </div>
                                <div id = "return-date">
                                    <label>Return Date:</label>
                                    <input type = "date" 
                                    min = {endDate} 
                                    name = "returnDate"
                                    value = {form.returnDate}
                                    onChange = {handleFormChange}/>
                                </div>
                            </div>

                            <div>
                                <label>Adults:</label>
                                <input type = "number" 
                                min = {0} 
                                step = {1}
                                name = "numAdults"
                                value = {form.numAdults}
                                onChange = {handleFormChange}/>
                            </div>

                            <div>
                                <label>Children (Max 5):</label>
                                <input type = "number" 
                                min = {0} 
                                step = {1}
                                max = {5}
                                name = "children"
                                value = {form.children}
                                onChange = {handleFormChange}/>

                                {(parseInt(form.children) > 0 && parseInt(form.children) <= 5 && Number.isInteger(parseInt(form.children))) ? (
                                    <div className = "age-add">
                                        {kids?.map((child, index) => {
                                            return <div className = "ages" key = {index}>
                                                <label> Enter the age of child (years): </label>
                                                <input key = {child + index} 
                                                type="number"
                                                name = {index} 
                                                value = {kids[index]} 
                                                autoFocus = "autoFocus"
                                                onChange = {updateKidsArray}/>
                                            </div>
                                        })}
                                    </div>) : (<div></div>)}
                            </div>

                            <div>
                                <label>Cabin:</label>
                                <select name = "cabin_class" onChange={handleFormChange}>
                                    <option value = "economy"> Economy </option>
                                    <option value = "first"> First Class </option>
                                    <option value = "business"> Business Class </option>
                                    <option value = "premium_economy"> Premium Economy </option>
                                </select>
                            </div>

                            <input id = "submit-form" 
                            type = "submit" 
                            onClick = {submitForm}
                            value = {"Find the best flights!"}/>

                        </div>
                    </form>
                )}
                </div>
            )}
        </div>
    )
}

export function FlightCard({ flight }) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

    const departTime = new Date(flight?.depTime1)
    const arriveTime = new Date(flight?.arrTime1)

    const start = (monthNames[departTime.getMonth()+1]) +
    " " + departTime.getDate() +
    ", " + departTime.getFullYear() +
    ", " + String(departTime.getHours()).padStart(2,0) +
    ":" + String(departTime.getMinutes()).padStart(2,0)

    const end = (monthNames[arriveTime.getMonth()+1]) +
    " " + arriveTime.getDate() +
    ", " + arriveTime.getFullYear() +
    ", " + String(arriveTime.getHours()).padStart(2,0) +
    ":" + String(arriveTime.getMinutes()).padStart(2,0)

    const departTime2 = new Date(flight?.depTime2)
    const arriveTime2 = new Date(flight?.arrTime2)

    const start2 = (monthNames[departTime2.getMonth()+1]) +
    " " + departTime2.getDate() +
    ", " + departTime2.getFullYear() +
    ", " + String(departTime2.getHours()).padStart(2,0) +
    ":" + String(departTime2.getMinutes()).padStart(2,0)

    const end2 = (monthNames[arriveTime2.getMonth()+1]) +
    " " + arriveTime2.getDate() +
    ", " + arriveTime2.getFullYear() +
    ", " + String(arriveTime2.getHours()).padStart(2,0) +
    ":" + String(arriveTime2.getMinutes()).padStart(2,0)

    return (
        <div className = "flight-card">
            <div className = "airline-info">
                <div className = "airline-image">
                    <img id = "a-image" src = {flight?.logo}/>
                </div>
                <div className = "airline-name">
                    <p> {flight?.name} </p>
                    <div className = "airline-price">
                        <p> {`$${flight?.totalAmount}`} </p>
                    </div>
                </div>
                <div className ="flight-information">
                    <div className = "depart-start">
                        <img id="airplane-logo" src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"/>
                        <p> {`${flight?.depIATA1}`} </p>
                        <p id = "departing-time"> {`${start}`} </p>
                    </div>
                    <img id = "arrow-indicator" src="https://static.thenounproject.com/png/1337191-200.png"/>
                    <div className = "flight-time">
                        <p> {`${flight?.totalTimeDepart} min`} </p>
                    </div>
                    <div className = "arrive-end">
                        <img id="airplane-logo-end" src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"/>
                        <p> {`${flight?.arrIATA1}`} </p>
                        <p id = "arriving-time"> {`${end}`} </p>
                    </div>
                </div>

                <div className ="flight-information">
                    <div className = "depart-start2">
                        <img id="airplane-logo" src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"/>
                        <p> {`${flight?.depIATA2}`} </p>
                        <p id = "departing-time2"> {`${start2}`} </p>
                    </div>
                    <img id = "arrow-indicator2" src="https://static.thenounproject.com/png/1337191-200.png"/>
                    <div className = "flight-time2">
                        <p> {`${flight?.totalTimeReturn} min`} </p>
                    </div>
                    <div className = "arrive-end2">
                        <img id="airplane-logo-end" src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"/>
                        <p> {`${flight?.arrIATA2}`} </p>
                        <p id = "arriving-time2"> {`${end2}`} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}