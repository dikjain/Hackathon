import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [signup, setSignup] = useState(null);
  const [load, setLoad] = useState(false);
  const [shownav, setShownav] = useState(true);
  const [currgig , setcurrgig] = useState(null)

  return (
    <MyContext.Provider value={{
      userInfo,
      setUserInfo,
      navigate,
      signup,
      setSignup,
      load,
      setLoad,
      shownav,
      setShownav,
      currgig,
      setcurrgig
    }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };