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
    return (
        <div className = "flight-card">
            <div className = "airline-image">
                <img id = "a-image" src = {flight?.logo}/>
            </div>
            <div className = "airline-info">
                <div className = "airline-name">
                <p> {flight?.name} </p>
                </div>
                <div className = "airline-price">
                    <p> {`$${flight?.total_amount}`} </p>
                </div>
            </div>
        </div>
    )
}