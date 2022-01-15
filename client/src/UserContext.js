import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const fetchUser = () => {
    axios
      .get("http://localhost:8000/api/loggedin", { withCredentials: true })
      .then((user) => setUser(user.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
