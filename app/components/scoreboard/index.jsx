import React from "react";

const Scoreboard = ({ score, currentCity }) => (
  <div className="mb-4 p-4 bg-white shadow-md rounded-lg w-full max-w-md text-center">
    <h1 className="text-2xl font-bold mb-2">Find the City</h1>
    <p className="text-lg">Current Score: {score}</p>
    {currentCity && <p className="text-lg">Find: {currentCity.name}</p>}
  </div>
);

export default Scoreboard;
