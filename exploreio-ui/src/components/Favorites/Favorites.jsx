import "./Favorites.css"
import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getFavorites, deleteFavorites } from "../../utilities/apiClient"

export default function Favorites({ isLoggedIn }) {
  const[favorites, setFavorites] = useState([])

  const deleteFavorite = async(event) => {
    try {
      const body = {name: event.target.id}
      const response = await deleteFavorites(body)
      getFavoritesList()
      setFavorites([...favorites])
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const getFavoritesList = async function() {
    try {
      const response = await getFavorites()
      setFavorites(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFavoritesList()
  }, [])

  return (
    <div>
    {!isLoggedIn ? (
      <div>
        <h1 className = "not-logged"> You must be logged in to view your favorites. </h1>
      </div>
    ) : (
    <div>
      <div className="favoritesContainer">
        <h1>Favorites</h1>
        <div className="favorites">

          {favorites?.length == 0 ? (
            <h2 className = "no-favorites"> You currently do not have any favorites. </h2>
          ) : (
            <div>
              {favorites?.map((element, index) => {
              element = element.destination
              return <div className="item" key = {index}>
                  <div className="media">
                    <img src = {element?.image}/>
                  </div>
                  <div className="titleanddescription">
                    <Link to = {`/destinations/${element?.destinationid}`}>
                      <h2>{element?.name}</h2>
                    </Link>
                    <p>{element?.description}</p>
                  </div>
                  <div className="deletebutton">
                    <button onClick ={deleteFavorite} id = {element.name}>X</button>
                  </div>
                </div>
              })}
            </div>
          )}
        </div>
      </div>
    </div>
    )}
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