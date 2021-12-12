import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  isLoading: true,
  getCurrenttUser: () => {},
  currentUser: null,
  /* addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0 */
});

const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);

  const getCurrenttUser = (user) => setCurrentUser(user);
  useEffect(() => {
    setIsLoading(false);
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        getCurrenttUser,
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
