import type { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import React from 'react';

import { setAuthToken } from '@/app/globals';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import { showError } from '@/ui/utils';

function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

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
        const error: AxiosError<unknown, any> = {
          name: 'Autorisatiefout',
          message:
            'Ongeldige inloggegevens. Controleer uw e-mail en wachtwoord en probeer het opnieuw.',
          isAxiosError: true,
          toJSON: () => ({}),
        };

        showError(error); // Show error message
        return;
      }

      const { access, refresh, token } = await response.json();
      console.log('Token:', token); // Log the token
      setAuthToken(token); // Save the token to the global variable
      signIn({ access, refresh });
      router.push('/');
    } catch (error) {
      console.error('Network request failed', error);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}

export default Login;
