import { useRouter } from 'expo-router';
import React from 'react';

import type { RegisterFormProps } from '@/components/register-form';
import { RegisterForm } from '@/components/register-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

function Register() {
  const router = useRouter();
  const { signIn } = useAuth();
  useSoftKeyboardEffect();

  const onSubmit: RegisterFormProps['onSubmit'] = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Registration failed', text);
        return;
      }

      const { access, refresh } = await response.json();
      signIn({ access, refresh });
      router.push('/');
    } catch (error) {
      console.error('Network request failed', error);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
}

export default Register;
