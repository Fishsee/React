import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const TestNetworkRequest = () => {
  useEffect(() => {
    const testFetch = async () => {
      try {
        const response = await fetch('http://100.86.204.58:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'testuser',
            email: 'testpass@gmail.com',
            password: 'testpass',
          }),
        });

        if (response.ok) {
          console.log('API is reachable');
        } else {
          console.error('Failed to reach API', response.status);
        }
      } catch (error) {
        console.error('Network request failed', error);
      }
    };

    testFetch();
  }, []);

  return (
    <View>
      <Text>Testing Network Connection</Text>
    </View>
  );
};

export default TestNetworkRequest;
