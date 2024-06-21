import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { setAuthToken } from '@/app/globals';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, View } from '@/ui';
import { showError } from '@/ui/utils';

function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [serverStatus, setServerStatus] = useState('checking');
  useSoftKeyboardEffect();

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(
          'https://aarondebruin321.pythonanywhere.com/monitor'
        );
        const data = await response.json();

        if (data.status === 'online') {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (error) {
        showError('Network error, please try again later.');
        setServerStatus('offline');
      }
    };

    checkServerStatus();
  }, []);

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    try {
      const response = await fetch(
        'https://fishsee.aeternaserver.net/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        showError(
          'Invalid login details. Please check your email and password and try again.'
        );
        return;
      }

      const { access, refresh, token } = await response.json();
      console.log('Token:', token);
      setAuthToken(token);
      signIn({ access, refresh });
      router.push('/');
    } catch (error) {
      console.error('Network request failed', error);
      showError('Network error, please try again later.');
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {serverStatus === 'offline' && (
          <Text>Sorry, de server is offline probeer het nog eens later.</Text>
        )}
      </View>
    </>
  );
}

export default Login;
