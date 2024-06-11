import React, { useEffect, useState } from 'react';

import { getAuthToken } from '@/app/globals'; // Ensure the path is correct based on your project structure
import { FocusAwareStatusBar, Text, View } from '@/ui';

function Issues() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = getAuthToken(); // Get the token from the global variable
    setToken(token); // Set the token to state
    console.log('Token:', token); // Log the token or use it as needed
  }, []);

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1 px-4 pb-56" style={{ paddingTop: 60 }}>
        <Text className="text-xl font-semibold">Token: {token}</Text>
      </View>
    </>
  );
}

export default Issues;
