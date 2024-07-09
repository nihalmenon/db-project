import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/user";

export const useUser = () => {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();

    const fetchUser = async () => {
        const token = localStorage.getItem('authToken');
        try {
          const response = await getUserDetails(token ? token : "");
          if (response.status === 200) {
            setUser(response.data.user);
            console.log("User details fetched successfully");
          } else {
            navigate('/signin');
          }
        } catch (error) {
          console.error("Error fetching user details", error);
          navigate('/signin');
        }
    }
    useEffect(() => {
        fetchUser();
    }, [navigate]);

    return user;
}