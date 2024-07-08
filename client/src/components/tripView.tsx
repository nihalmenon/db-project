import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import { getTripDetails} from '../actions/user';

export const TripView = () => {
    const location = useLocation();
    const { tripId } = location.state;

    const [trips, setTrip] = useState<any>({});
    

    const fetchTripDetails = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        const response = await getTripDetails(tripId, token ? token : "");

        console.log(response);
        if (response.status === 200) {
            setTrip(response.data[0]);
        } else {
            console.error("Error fetching trip details");
        }
    }, [tripId]);

    useEffect(() => {
        console.log("Fetching trip details");
        console.log(tripId);
       fetchTripDetails();
    }, [fetchTripDetails]);

  return (
<div>
  {
    (() => {
      const tripElements = [];
      console.log("BROOOOOO", trips);
      for (let i = 0; i < trips.length; i++) {
        console.log("HUUHUHHUH", trips.a_description);
        const trip = trips[i];
        tripElements.push(
          <div key={i}>
            <h1>Trip Details for Trip {trip.tid}</h1>
            <p><strong>Description:</strong> {trip.a_description}</p>
            <p><strong>Country:</strong> {trip.c_name}</p>
            <p><strong>City:</strong> {trip.city}</p>
            <p><strong>Start Date:</strong> {new Date(trip.start_date).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(trip.end_date).toLocaleDateString()}</p>
          </div>
        );
      }
      return tripElements;
    })()
  }
</div>


  );
};
