import React, { useEffect, useState } from 'react';
import { getUserDetails, getUserTrips } from '../actions/user';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [user, setUser] = useState<any>({});
  const [trips, setTrips] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await getUserDetails(token ? token : "");
      if (response.status === 200) {
        console.log("User details fetched successfully");
        console.log(response.data);
        setUser(response.data.user);
      }else{
        navigate('/signin');
      }
    } catch {
      console.error("Error fetching user details");
      navigate('/signin');
    }
  }

  const fetchTrips = async () => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await getUserTrips(token ? token : "");
      if (response.status === 200) {
        console.log("Trips fetched successfully", response.data);
        setTrips(response.data);
      }
    } catch {
      console.error("Error fetching trips");
    }
  }

  useEffect(() => {
    fetchUserDetails();
    fetchTrips();
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      {
        trips.length > 0 ? (
          <div>
            <h2>{user.first_name}'s Trips</h2>
            <ul>
              {trips.map((trip, index) => (
                <li key={trip.tid}>
                  <h3>{trip.lid}</h3>
                  <p>{trip.start_date} - {trip.end_date}</p>
                  <p>{trip.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No trips to show</p>
        )
      }
    </div>
  )
};