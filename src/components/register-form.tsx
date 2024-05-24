import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install this package
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const RegisterForm = ({ onSubmit = () => {} }: RegisterFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <View className="flex-1 p-4">
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 65 }}
        onPress={() => router.navigate('login')}
      >
        <Icon name="arrow-back" size={24} color="#000" />
        <Text style={{ marginLeft: 8, fontSize: 16, color: '#000' }}>
          Login
        </Text>
      </TouchableOpacity>

      <Text
        testID="form-title"
        className="text-b pb-6 font-bold"
        style={{ paddingTop: 120, fontSize: 30 }}
      >
        Account aanmaken
      </Text>

      <ControlledInput
        testID="name"
        control={control}
        name="name"
        label="Gebruikersnaam"
        style={{ backgroundColor: '#FFF', marginBottom: 20 }}
      />

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
        style={{ backgroundColor: '#FFF', marginBottom: 20 }}
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Wachtwoord"
        placeholder="***"
        secureTextEntry={true}
        style={{ backgroundColor: '#FFF', marginBottom: 20 }}
      />
      <Button
        testID="login-button"
        label="Registreren"
        onPress={handleSubmit(onSubmit)}
        style={{ height: 48, backgroundColor: '#3772E3' }}
      />
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 14,
          marginTop: 10,
        }}
        onPress={() => router.navigate('/login')}
      >
        Al een account? Login
      </Text>
    </View>
  );
};
