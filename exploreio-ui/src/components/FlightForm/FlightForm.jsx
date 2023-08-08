import React from "react";
import { useState, useEffect } from "react";
import { getFlight } from "../../utilities/apiClient";
import "./FlightForm.css";

export default function FlightForm({ area, isFetching, destinationIATA }) {
  const [flights, setFlights] = new useState(undefined);
  const [fetching, setFetching] = new useState(false);
  const [startDate, setStartDate] = new useState(
    new Date().toLocaleDateString("fr-ca")
  );
  const [endDate, setEndDate] = new useState(undefined);
  const [error, setError] = new useState(undefined);
  const [kids, setKids] = new useState([]);

  const [form, setForm] = new useState({
    IATA: "",
    destination: "",
    departDate: "",
    returnDate: "",
    numAdults: 0,
    children: 0,
    cabin_class: "economy",
  });

  useEffect(() => {
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    if (form.children && parseInt(form.children) >= 0) {
      let array = new Array(form.children != "" ? parseInt(form.children) : 0);
      array.fill(0);
      setKids(array);
    } else {
      setKids([]);
    }
  }, [form.children]);

  const handleChange = async function (event) {
    event.preventDefault();
    setEndDate(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFormChange = async function (event) {
    if (event.target.name === "children" && parseInt(event.target.value) > 5) {
    } else {
      event.preventDefault();
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const resetForm = async function () {
    setError(undefined);
    setFlights(undefined);
    setForm({
      ...form,
      IATA: "",
      destination: "",
      departDate: "",
      returnDate: "",
      numAdults: 0,
      children: 0,
      cabin_class: "economy",
    });
  };

  const updateKidsArray = async function (event) {
    event.preventDefault();
    let current = [...kids];
    current[event.target.name] =
      event.target.value != "" ? parseInt(event.target.value) : 0;
    setKids(current);
  };

  const submitForm = async function (event) {
    event.preventDefault();
    let valid = true;

    let request = {
      IATA: form.IATA,
      destination: area,
      departDate: form.departDate,
      returnDate: form.returnDate,
      numAdults: form.numAdults,
      children: kids,
      cabin_class: form.cabin_class,
    };

    if (request?.IATA?.length != 3) {
      setError("ERROR: Invalid IATA code.");
      valid = false;
    } else if (request?.departDate === "" || request?.returnDate === "") {
      setError("ERROR: Enter a valid date.");
      valid = false;
    } else if (request?.departDate === request?.returnDate) {
      setError("ERROR: Cannot book same day departure/return.");
      valid = false;
    } else if (Number.parseInt(request?.numAdults) === 0) {
      setError("ERROR: You must have an adult.");
      valid = false;
    } else if (Number.parseInt(request?.numAdults) > 4) {
      setError("ERROR: You cannot bring more than four adults.");
      valid = false;
    } else if (Number.parseInt(form?.children) < 0) {
      setError("ERROR: Enter a valid number of children.");
      valid = false;
    } else if (request?.IATA === destinationIATA) {
      setError("ERROR: Cannot depart from the airport you will arrive in.");
      valid = false;
    }

    if (request?.children?.length > 0) {
      request?.children?.forEach((kid) => {
        if (kid <= 0 || kid > 18) {
          setError("ERROR: Children are between 1 and 17 years of age.");
          valid = false;
        }
      });
    }

    if (valid) {
      let response = undefined;

      response = await sendFlightRequest(request);
      if (!response) {
        setError(
          "ERROR: Ensure that departing IATA code is valid or numerical inputs are valid."
        );
      }
    }

    return response;
  };

  const sendFlightRequest = async function (request) {
    try {
      setFetching(true);
      const response = await getFlight(request);
      setFlights(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="flight-form">
      <div className="flight-top-part">
        <h2 className="flights-title">Flights</h2>
        {fetching ? (
          <img
            className="loading-flights"
            src="https://thumbs.gfycat.com/ImprobablePertinentGraysquirrel-size_restricted.gif"
          />
        ) : (
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
                return <FlightCard key={flight + index} flight={flight} />;
              })}
              <button id="reset-button" onClick={resetForm}>
                {" "}
                Reset Form{" "}
              </button>
            </div>
          ) : (
            <form id="request-form">
              <p id="instructions">
                {" "}
                Instructions:{" "}
                <span id="instructions-bold">
                  Enter an IATA code of an airport nearby to you.{" "}
                </span>
                This is the airport in which you will depart from. If you are
                having trouble locating and IATA code,{" "}
                <a href="https://www.ccra.com/airport-codes/" target="_blank">
                  {" "}
                  here{" "}
                </a>
                is a list of IATA codes linked to cities.
              </p>

              <p id="instructions">
                {" "}
                Then,{" "}
                <span id="instructions-bold">
                  enter the dates which you will depart and return from/to the
                  airport.{" "}
                </span>
                Enter the number of adults and children flying, select your
                cabin type, and start searching!{" "}
              </p>
              {error && (
                <div className="error-message">
                  {" "}
                  <p>{error}</p>{" "}
                </div>
              )}
              <div>
                <label> Origin airport IATA: </label>
                <input
                  type="text"
                  name="IATA"
                  placeholder="Enter 3-letter IATA code"
                  value={form.IATA}
                  onChange={handleFormChange}
                />

                <div className="flight-dates">
                  <div id="depart-date">
                    <label>Departure Date:</label>
                    <input
                      type="date"
                      min={startDate}
                      name="departDate"
                      value={form.departDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div id="return-date">
                    <label>Return Date:</label>
                    <input
                      type="date"
                      min={endDate}
                      name="returnDate"
                      value={form.returnDate}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div>
                  <label>Adults (Max 4):</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    max={4}
                    name="numAdults"
                    value={form.numAdults}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label>Children (Max 5):</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    max={5}
                    name="children"
                    value={form.children}
                    onChange={handleFormChange}
                  />

                  {parseInt(form.children) > 0 &&
                  parseInt(form.children) <= 5 &&
                  Number.isInteger(parseInt(form.children)) ? (
                    <div className="age-add">
                      {kids?.map((child, index) => {
                        return (
                          <div className="ages" key={index}>
                            <label> Enter the age of child (years): </label>
                            <input
                              key={child + index}
                              type="number"
                              name={index}
                              value={kids[index]}
                              autoFocus="autoFocus"
                              onChange={updateKidsArray}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div>
                  <label>Cabin:</label>
                  <select name="cabin_class" onChange={handleFormChange}>
                    <option value="economy"> Economy </option>
                    <option value="first"> First Class </option>
                    <option value="business"> Business Class </option>
                    <option value="premium_economy"> Premium Economy </option>
                  </select>
                </div>

                <input
                  id="submit-form"
                  type="submit"
                  onClick={submitForm}
                  value={"Find the best flights!"}
                />
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export function FlightCard({ flight }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const departTime = new Date(flight?.depTime1);
  const arriveTime = new Date(flight?.arrTime1);

  const start =
    monthNames[departTime.getMonth()] +
    " " +
    departTime.getDate() +
    ", " +
    departTime.getFullYear() +
    ", " +
    String(departTime.getHours()).padStart(2, 0) +
    ":" +
    String(departTime.getMinutes()).padStart(2, 0);

  const end =
    monthNames[arriveTime.getMonth()] +
    " " +
    arriveTime.getDate() +
    ", " +
    arriveTime.getFullYear() +
    ", " +
    String(arriveTime.getHours()).padStart(2, 0) +
    ":" +
    String(arriveTime.getMinutes()).padStart(2, 0);

  const departTime2 = new Date(flight?.depTime2);
  const arriveTime2 = new Date(flight?.arrTime2);

  const start2 =
    monthNames[departTime2.getMonth()] +
    " " +
    departTime2.getDate() +
    ", " +
    departTime2.getFullYear() +
    ", " +
    String(departTime2.getHours()).padStart(2, 0) +
    ":" +
    String(departTime2.getMinutes()).padStart(2, 0);

  const end2 =
    monthNames[arriveTime2.getMonth()] +
    " " +
    arriveTime2.getDate() +
    ", " +
    arriveTime2.getFullYear() +
    ", " +
    String(arriveTime2.getHours()).padStart(2, 0) +
    ":" +
    String(arriveTime2.getMinutes()).padStart(2, 0);

  let hours1 = Math.floor(flight?.totalTimeDepart / 60);
  let minutes1 = flight?.totalTimeDepart % 60;

  let hours2 = Math.floor(flight?.totalTimeReturn / 60);
  let minutes2 = flight?.totalTimeReturn % 60;

  return (
    <div className="flight-card">
      <div className="airline-info">
        <div className="airline-image">
          <img id="a-image" src={flight?.logo} />
        </div>
        <div className="airline-name">
          <p> {flight?.name} </p>
          <div className="airline-price">
            <p> {`$${flight?.totalAmount}`} </p>
          </div>
        </div>
        <div className="flight-information">
          <div className="depart-start">
            <img
              id="airplane-logo"
              src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"
            />
            <p> {`${flight?.depIATA1}`} </p>
            <p id="departing-time"> {`${start}`} </p>
          </div>
          <img
            id="arrow-indicator"
            src="https://static.thenounproject.com/png/1337191-200.png"
          />
          <div className="flight-time">
            <p> {`${hours1}hr, ${minutes1}min`} </p>
          </div>
          <div className="arrive-end">
            <img
              id="airplane-logo-end"
              src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"
            />
            <p> {`${flight?.arrIATA1}`} </p>
            <p id="arriving-time"> {`${end}`} </p>
          </div>
        </div>

        <div className="flight-information">
          <div className="depart-start2">
            <img
              id="airplane-logo"
              src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"
            />
            <p> {`${flight?.depIATA2}`} </p>
            <p id="departing-time2"> {`${start2}`} </p>
          </div>
          <img
            id="arrow-indicator2"
            src="https://static.thenounproject.com/png/1337191-200.png"
          />
          <div className="flight-time2">
            <p> {`${hours2}hr, ${minutes2}min`} </p>
          </div>
          <div className="arrive-end2">
            <img
              id="airplane-logo-end"
              src="https://www.freeiconspng.com/thumbs/airplane-icon-png/plane-icon-png-images--pictures--becuo-8.png"
            />
            <p> {`${flight?.arrIATA2}`} </p>
            <p id="arriving-time2"> {`${end2}`} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
