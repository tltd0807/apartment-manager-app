import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userName: "",
  avatarUrl: "",
});

export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const [token, setToken] = useState(initToken);
  const initUserName = localStorage.getItem("useName");
  const [userName, setUserName] = useState(initUserName);
  const initAvatarUrl = localStorage.getItem("avatarUrl");
  const [avatarUrl, setAvatarUrl] = useState(initAvatarUrl);

  const userIsLoggedIn = !!token;
  const LoginHandler = (token, userName, avatarUrl) => {
    setToken(token);
    localStorage.setItem("token", token);

    setAvatarUrl(avatarUrl);
    localStorage.setItem("avatarUrl", avatarUrl);

    setUserName(userName);
    localStorage.setItem("userName", userName);
  };
  const LogoutHandler = () => {
    setToken(null);
    setUserName(null);
    setAvatarUrl(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("avatarUrl");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: LoginHandler,
    logout: LogoutHandler,
    userName: userName,
    avatarUrl: avatarUrl,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
