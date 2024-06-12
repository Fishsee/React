/* eslint-disable unicorn/filename-case */
import { useEffect, useState } from 'react';

import { getAuthToken } from '@/app/globals'; // Ensure the path is correct based on your structure

function useAuthToken() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = getAuthToken(); // Get the token from the global variable
    setToken(token); // Set the token to state
    console.log('Token:', token); // Log the token or use it as needed
  }, []);

  return token;
}

export default useAuthToken;
