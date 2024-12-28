import axios from "axios";
import { API_BASE_URL } from "config/api";

  
export const registerUser = async (userData, setUser, setIsLoggedIn) => {
  try {
    
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

    if (data.jwt) {
      
      localStorage.setItem("jwt", data.jwt);

      
      setUser(data.user); 
      setIsLoggedIn(true);

      console.log("Register success", data);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
};