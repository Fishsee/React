import { useRouter } from 'expo-router';
import React from 'react';

import type { ForgotPasswordFormProps } from '@/components/forgot-password-form';
import { ForgotPasswordForm } from '@/components/forgot-password-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

function ForgotPassword() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const onSubmit: ForgotPasswordFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/code');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <ForgotPasswordForm onSubmit={onSubmit} />
    </>
  );
}

export default ForgotPassword;
