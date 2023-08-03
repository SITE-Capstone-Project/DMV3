import "./Favorites.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFavorites, deleteFavorites } from "../../utilities/apiClient";
import finalstamp from "../../assets/finalstamp.png";

export default function Favorites({ isLoggedIn }) {
  const [favorites, setFavorites] = useState([]);

  const deleteFavorite = async (event) => {
    try {
      const body = { name: event.target.id };
      const response = await deleteFavorites(body);
      getFavoritesList();
      setFavorites([...favorites]);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getFavoritesList = async function () {
    try {
      const response = await getFavorites();
      setFavorites(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavoritesList();
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h1 className="not-logged">
            {" "}
            You must be logged in to view your favorites.{" "}
          </h1>
        </div>
      ) : (
        <div>
          <div className="favoritesContainer">
            <h1>Favorites</h1>
            <div className="pushinP">
              <p>Click the stamp to flip over the card!</p>
            </div>
            {/* <div className="favorites"> */}

            {favorites?.length == 0 ? (
              <h2 className="no-favorites">
                {" "}
                You currently do not have any favorites.{" "}
              </h2>
            ) : (
              <div className="test">
                {favorites?.map((element, index) => {
                  return <Postcard 
                  element={element?.destination} 
                  key={element + index}
                  deleteFavorite={deleteFavorite}
                  information = {element?.activities}/>;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Postcard({ element, deleteFavorite, information }) {
  const [flipped, setFlipped] = useState(false);

  const flipOver = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={flipped ? "favorites flipped" : "favorites"}>

      <div className="item">
        <div className="media">
          <img src={element?.image} />
        </div>
        <div className="titleanddescription">
          <Link to={`/destinations/${element?.destinationid}`}>
            <h2>{element?.name}</h2>
          </Link>
          <p>{element?.description}</p>
        </div>
        <div className="buttons">
          <div className="stamp">
            <button onClick={flipOver}>
              <img src={finalstamp} />
            </button>
          </div>
          <div className="deletebutton">
            <button onClick={deleteFavorite} id={element.name}>
              X
            </button>
          </div>
        </div>
      </div>

      <div className="itemback">
        <div className="itemback-flex">
          <div className="activitiesanddescription">

            <h2>Activities</h2>
            {information?.map((element, index) => {
              let packageinfo = JSON.parse(element?.activityinfo)
              if (packageinfo?.type === "activity") {
                return <div key = {element + index}> {packageinfo?.info} </div>
              }
            })}

            <h2>Hotels</h2>
            {information?.map((element, index) => {
              let packageinfo = JSON.parse(element?.activityinfo)
              if (packageinfo?.type === "hotel") {
                return <div key = {element + index}> 
                  <a href={packageinfo?.info?.web_url} target="_blank">
                    {packageinfo?.info?.name}
                  </a> 
                </div>
              }
            })}
          </div>

          <div className="stamp">
            <button id ="flip-button" onClick={flipOver}>
              <img src={finalstamp}/>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
