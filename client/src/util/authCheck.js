import axios from "axios";
import { getUser } from "./getUser";

export const handleLogout = async () => {
  await axios
    .get("http://localhost:5000/login/api/logout", {
      withCredentials: true,
    })
    .then(window.location.replace("/"));
};
export const cookieCheck = async (setIsLogin, setUser) => {
  await axios
    .get("http://localhost:5000/login/api/login/cookiecheck", {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data === "checkSuccess") {
        setIsLogin(true);
        getUser(setUser);
      } else {
        setIsLogin(false);
      }
    });
};
export const cookieCheckLogin = async (setIsLogin) => {
  await axios
    .get("http://localhost:5000/login/api/login/cookiecheck", {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data === "checkSuccess") {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
};
export const authCheck = async () => {
  await axios
    .get("http://localhost:5000/login/api/login/success", {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data === "timeout") {
        handleLogout();
      }
    });
};

export const getUserName = async (setUserName) => {
  await axios
    .get("http://localhost:5000/login/api/login/getusername", {
      withCredentials: true,
    })
    .then((response) => {
      // setUser(response.data);
      setUserName(response.data);
    });
};
