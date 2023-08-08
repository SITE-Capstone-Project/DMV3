import React from "react";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Hotels.css";
import { addActivity, deleteActivity } from "../../utilities/apiClient";

export default function Hotels({
  hotels,
  destinationid,
  favorite,
  isLoggedIn,
  loadedFavorites,
}) {
  return (
    <div className="hotels-list">
      <h2 className="hotels-title"> Hotels </h2>
      {hotels?.length != 0 && (
        <div>
          {hotels?.map((element, index) => {
            return (
              <HotelCard
                key={element + index}
                hotel={element}
                isLoggedIn={isLoggedIn}
                destinationid={destinationid}
                favorite={favorite}
                loadedFavorites={loadedFavorites}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function HotelCard({
  hotel,
  destinationid,
  favorite,
  isLoggedIn,
  loadedFavorites,
}) {
  const [isHover, setIsHover] = useState(false);
  const [index, setIndex] = useState(0);
  const [canAddHotel, setHotel] = useState(true);

  const checkHotel = async function () {
    try {
      const response = loadedFavorites;
      for (let i = 0; i < response?.length; i++) {
        if (response[i]?.destination?.destinationid === destinationid) {
          let destActivities = response[i]?.activities;
          if (destActivities?.length != 0) {
            for (let j = 0; j < destActivities.length; j++) {
              let activInfo = JSON.parse(destActivities[j]?.activityinfo);
              if (activInfo?.info?.name === hotel?.name) {
                setHotel(false);
                break;
              } else {
                setHotel(true);
              }
            }
          } else setHotel(true);
        }
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const formatString = (string, num) => {
    let formatted = string;
    if (formatted?.length <= num) {
    } else {
      formatted = string?.substring(0, num);
      if (formatted?.charAt(formatted.length - 1) == " ") {
        formatted = string?.substring(0, num - 1);
      }
      formatted += "..";
    }

    return formatted;
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    checkHotel();
  }, [favorite]);

  const addHotelToFavorite = async function () {
    const cardInfo = { type: "hotel", info: hotel };
    const body = { id: destinationid, activityinfo: JSON.stringify(cardInfo) };
    try {
      const response = await addActivity(body);
      setHotel(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const removeHotelFromFavorite = async function () {
    const cardInfo = { type: "hotel", info: hotel };
    const body = { id: destinationid, activityinfo: JSON.stringify(cardInfo) };
    try {
      const response = await deleteActivity(body);
      setHotel(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="hotel-card"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {hotel?.images?.length > 0 ? (
        <div>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            indicators={false}
            slide={false}
          >
            {hotel?.images?.map((element, index) => {
              return (
                <Carousel.Item key={element + index} interval={1000000}>
                  <img id="hotel-image" src={element} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div></div>
      )}

      {hotel?.description ? (
        <div>
          {isHover && (
            <div className="popup-description">
              <p id="hotel-title-popup"> {hotel?.name} </p>
              <p> {hotel?.description} </p>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
      <div className="hotel-intro">
        <p id="hotel-title">
          <a href={hotel?.web_url}> {formatString(hotel?.name, 17)} </a>
        </p>
      </div>
      <div className="hotel-details">
        {hotel?.price_level ? (
          <div>
            <p id="hotel-pricerange"> {hotel?.price_level} </p>
          </div>
        ) : (
          <div></div>
        )}
        {hotel?.rating ? (
          <div className="hotel-details">
            
            <img
              id="rating-star"
              src={`https://purepng.com/public/uploads/large/purepng.com-green-starstargeometricallydecagonconcavestardomclipartgreen-1421526503700o6cix.png`}
            />
            <p id="hotel-rating"> {hotel?.rating} </p>
          </div>
        ) : (
          <div></div>
        )}
        {hotel?.description ? (
          <div>
            <p id="description"> {formatString(hotel?.description, 20)}</p>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
      {isLoggedIn ? (
        <div>
          {favorite ? (
            <div> </div>
          ) : canAddHotel ? (
            <button id="add-hotel" onClick={addHotelToFavorite}>
              Add Hotel
            </button>
          ) : (
            <button id="remove-hotel" onClick={removeHotelFromFavorite}>
              Remove Hotel
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
