import "./FunFacts.css";
import React from "react";

export default function FunFacts({ facts }) {
  return (
    <div className="fun-facts">
      <h2 className="facts-title">Fun Facts</h2>
      {facts?.map((element, index) => {
        return <Fact key={element + index} fact={element} />;
      })}
    </div>
  );
}

export function Fact({ fact }) {
  return (
    <div className="fact-card">
      <p id="fact"> {fact} </p>
    </div>
  );
}
