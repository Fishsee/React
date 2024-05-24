import { useRouter } from 'expo-router';
import React from 'react';

import type { CodeFormProps } from '@/components/code-form';
import { CodeForm } from '@/components/code-form';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

function Code() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const onSubmit: CodeFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/login');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <CodeForm onSubmit={onSubmit} />
    </>
  );
}

export default Code;
