import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext({ userName: '', aquariumId: '' });

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [aquariumId, setAquariumId] = useState('');

  useEffect(() => {
    setUserName('TestUser');
    setAquariumId('12345');
  }, []);

  return (
    <UserContext.Provider value={{ userName, aquariumId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
