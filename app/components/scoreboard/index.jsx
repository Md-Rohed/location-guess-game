// Scoreboard.tsx
import React from "react";

const Scoreboard = ({ score, currentCity }) => (
  <div>
    <h1>Find the City</h1>
    <p>Current Score: {score}</p>
    {currentCity && <p>Find: {currentCity.name}</p>}
  </div>
);

export default Scoreboard;
