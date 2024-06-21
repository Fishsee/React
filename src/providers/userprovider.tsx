import React, { useState, useEffect } from 'react';
import UserContext from '@/contexts/user-context';
import useAuthToken from '@/hooks/useAuthToken';
import { Code } from '@/ui/icons';

const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [aquariumId, setAquariumId] = useState('');
  const [phValue, setPhValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useAuthToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://fishsee.aeternaserver.net/api/user',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserName(data.user.name);
        setAquariumId(data.aquarium_id);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  useEffect(() => {
    const fetchPhValue = async () => {
      try {
        const url = `https://fishsee.aeternaserver.net/api/last-PH/${aquariumId}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch PH value');
        }

        const data = await response.json();
        setPhValue(data.data.phValue);
      } catch (error) {
        setError(error.message);
      }
    };

    if (token && aquariumId) {
      fetchPhValue();
    }
  }, [token, aquariumId]);

  return (
    <UserContext.Provider
      value={{ userName, aquariumId, phValue, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
