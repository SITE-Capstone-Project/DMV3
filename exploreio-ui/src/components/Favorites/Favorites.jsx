import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Favorites.css"
import DestinationCard from "../DestinationCard/DestinationCard"

export default function Favorites() {
  const deleteFavorite = async() => {
    //call the api call 
  }

  return (
    <div className="favoritesContainer">
        <h1>Favorites</h1>
        <div className="favorites">
          <div className="item">
            <div className="media">
              <img src = "https://i.pinimg.com/736x/d6/86/00/d686006cd73a4402eaa5ccf42eb070d9.jpg"/>
            </div>
            <div className="titleanddescription">
              <h2>Los Angeles</h2>
              <p>This is LA.</p>
            </div>
          </div>

          <div className="item">
            <div className="media">
              <img src = "https://i.pinimg.com/736x/d6/86/00/d686006cd73a4402eaa5ccf42eb070d9.jpg"/>
            </div>
            <div className="titleanddescription">
              <h2>New York</h2>
              <p>This is NY.</p>
            </div>
            <div className="deletebutton">
              <button onClick ={deleteFavorite}>X</button>
            </div>
          </div>

          <div className="item">
            <div className="media">
              <img src = "https://i.pinimg.com/736x/d6/86/00/d686006cd73a4402eaa5ccf42eb070d9.jpg"/>
            </div>
            <div className="titleanddescription">
              <h2>Toronto</h2>
              <p>This is Toronto.</p>
            </div>
            <div className="deletebutton">
              <button onClick ={deleteFavorite}>X</button>
            </div>
          </div>
        </div>
    </div>
  )
}

// import React, { useState, useRef } from 'react';
// import './Favorites.css';
 
// const Favorites = () => {
  
//   const dragItem = useRef();
//   const dragOverItem = useRef();
//   const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
 
//   const dragStart = (e, position) => {
//     dragItem.current = position;
//     console.log(e.target.innerHTML);
//   };
 
//   const dragEnter = (e, position) => {
//     dragOverItem.current = position;
//     console.log(e.target.innerHTML);
//   };
 
//   const drop = (e) => {
//     const copyListItems = [...list];
//     const dragItemContent = copyListItems[dragItem.current];
//     copyListItems.splice(dragItem.current, 1);
//     copyListItems.splice(dragOverItem.current, 0, dragItemContent);
//     dragItem.current = null;
//     dragOverItem.current = null;
//     setList(copyListItems);
//   };
 
//   return (
//     <>
//     {
//     list&&
//     list.map((item, index) => (
//       <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
//         onDragStart={(e) => dragStart(e, index)}
//         onDragEnter={(e) => dragEnter(e, index)}
//         onDragEnd={drop}
//         key={index}
//         draggable>
//           {item}
//       </div>
//       ))}
//     </>
//   );
// };
// export default Favorites;