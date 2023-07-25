import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Favorites.css"
import DestinationCard from "../DestinationCard/DestinationCard"

export default function Favorites() {
  return (
    <div className="favoritesContainer">
        <h2>Favorites</h2>
        <div className="favorites">
            <DestinationCard/>
            <DestinationCard/>
            <DestinationCard/>
            <DestinationCard/>
            <DestinationCard/>
        </div>
    </div>
  )
}