import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const fetchUserData = async () => {
  try {
    const response = await fetch('https://fishsee.aeternaserver.net/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('User Data:', data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const UserComponent: React.FC = () => {
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View>
      <Text>Check the console for user data</Text>
    </View>
  );
};

export default UserComponent;
