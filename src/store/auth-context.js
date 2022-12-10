import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userName: "",
  avatarUrl: "",
  role: 0,
});

export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const initUserName = localStorage.getItem("userName");
  const initAvatarUrl = localStorage.getItem("avatarUrl");
  const initRole = localStorage.getItem("role");
  const [token, setToken] = useState(initToken);
  const [userName, setUserName] = useState(initUserName);
  const [avatarUrl, setAvatarUrl] = useState(initAvatarUrl);
  const [role, setRole] = useState(initRole);

  const userIsLoggedIn = !!token;
  const LoginHandler = (token, userName, avatarUrl, role) => {
    setToken(token);
    localStorage.setItem("token", token);

    setAvatarUrl(avatarUrl);
    localStorage.setItem("avatarUrl", avatarUrl);

    setUserName(userName);
    localStorage.setItem("userName", userName);

    setRole(role);
    localStorage.setItem("role", role);
  };
  const LogoutHandler = () => {
    setToken(null);
    setUserName(null);
    setAvatarUrl(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("role");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: LoginHandler,
    logout: LogoutHandler,
    userName: userName,
    avatarUrl: avatarUrl,
    role: role,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
