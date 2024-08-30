import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  function updateUser(userData) {
    setCurrentUser(userData);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("Context is used outside !");
  }

  return value;
}

export { useAuthContext, AuthContextProvider };
