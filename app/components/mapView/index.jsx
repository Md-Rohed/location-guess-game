"use client";
import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { cities } from "@/data/cityData";
import { calculateDistance } from "@/utils/calculate";
import Scoreboard from "../scoreboard";
import GameMap from "../gameMap";

const initialScore = 1500;

const MapView = () => {
  const [score, setScore] = useState(initialScore);
  const [currentCity, setCurrentCity] = useState(null);
  const [placedPin, setPlacedPin] = useState(null);
  const [correctPin, setCorrectPin] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState(0);

  useEffect(() => {
    setCurrentCity(getRandomCity());
  }, []);

  const getRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const handleMapClick = (event) => {
    if (!currentCity) return;

    const { lngLat } = event;
    const guessedPin = { lat: lngLat.lat, lng: lngLat.lng };
    setPlacedPin(guessedPin);
    const distance = calculateDistance(
      lngLat.lat,
      lngLat.lng,
      currentCity.position.lat,
      currentCity.position.lng
    );

    if (distance <= 50) {
      setCorrectGuesses(correctGuesses + 1);
    }

    setScore(score - distance);

    setCorrectPin(currentCity.position);

    if (score - distance <= 0) {
      alert(`Game Over! You found ${correctGuesses} cities.`);
      setScore(initialScore);
      setCorrectGuesses(0);
      setCurrentCity(getRandomCity());
      setPlacedPin(null);
      setCorrectPin(null);
    } else {
      setTimeout(() => {
        setCurrentCity(getRandomCity());
        setPlacedPin(null);
        setCorrectPin(null);
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <Scoreboard score={score} currentCity={currentCity} />
      <GameMap
        placedPin={placedPin}
        correctPin={correctPin}
        handleMapClick={handleMapClick}
      />
    </div>
  );
};

export default MapView;
