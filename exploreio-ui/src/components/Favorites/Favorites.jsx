import "./Favorites.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFavorites, deleteFavorites } from "../../utilities/apiClient";
import finalstamp from "../../assets/finalstamp.png";
import backstamp from "../../assets/removedBackgroundPostcard.png";

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
            {/* <div className="favorites"> */}

            {favorites?.length == 0 ? (
              <h2 className="no-favorites">
                {" "}
                You currently do not have any favorites.{" "}
              </h2>
            ) : (
              <div className="test">
                {favorites?.map((element, index) => {
                  return <Postcard element={element} key={element + index} />;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Postcard({ element, deleteFavorite }) {
  const [flipped, setFlipped] = useState(false);
  const [flipback, setFlipBack] = useState(false);

  const flipOver = () => {
    setFlipped(!flipped);
    console.log(flipped);
  };

  const flipBack = () => {
    setFlipBack(!flipback);
  };

  return (
    <div className={flipped ? "favorites itemback" : "favorites"}>
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
        <div className="activitiesanddescription">
          <h2>Favorite Activities</h2>
          <p>[List of favorite activities goes here]</p>
          <button className = "backstamp" onClick={flipBack}>
            {/* <img src={backstamp}/> */}
            This is a Button.
          </button>
        </div>

        <div className="backstamp">
          <button onClick={flipOver}>
            {/* <img src={backstamp}/> */}
            {/* This is a Button. */}
          </button>
        </div>
      </div>
    </div>
  );
}
