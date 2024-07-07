import React from "react";
import { useLocation } from 'react-router-dom';


export const TripView = () => {
    const location = useLocation();
    const { tripId } = location.state;
  
    return (
      <div>
        <h1>Trip Details for Trip {tripId}</h1>
        {}
      </div>
    );
}