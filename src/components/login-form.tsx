import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as z from 'zod';

import { Button, ControlledInput, Text, TouchableOpacity, View } from '@/ui';

const schema = z.object({
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is verplicht',
    })
    .email('Ongeldig e-mailadres'),
  password: z
    .string({
      required_error: 'Wachtwoord is verplicht',
    })
    .min(6, 'Wachtwoord moet minimaal 6 tekens bevatten'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

// eslint-disable-next-line max-lines-per-function
export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="flex-1 p-4" style={{ paddingTop: 250 }}>
      <Image
        source={require('/assets/logo.png')} // Make sure to replace with your actual logo path
        style={styles.logo}
      />
      <Text
        testID="form-title"
        className="text-b pb-6 text-[30px] font-bold"
        style={{ fontSize: 30 }}
      >
        Inloggen
      </Text>

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
        // Use the state variable for the secureTextEntry prop
        secureTextEntry={!passwordVisible}
        style={{ backgroundColor: '#FFF', marginBottom: 20 }}
        // Add a button to toggle password visibility
        right={
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              marginLeft: 10,
              position: 'absolute',
              right: 0,
            }}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? 'Wachtwoord verbergen' : 'Wachtwoord weergeven'}
          </Text>
        }
      />
      <Button
        testID="login-button"
        label="Inloggen"
        onPress={handleSubmit(onSubmit)}
        style={{ height: 48, backgroundColor: '#3772E3' }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 14,
            marginTop: 10,
          }}
          onPress={() => {
            router.replace('/register');
          }}
        >
          Account aanmaken
        </Text>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 14,
            marginTop: 10,
          }}
          onPress={toggleModal}
        >
          Wachtwoord vergeten?
        </Text>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              // Handle reset via email
              router.navigate('/forgot-password');
              toggleModal();
            }}
          >
            <Icon name="mail-outline" size={26} color="#3772E3" />
            <Text style={styles.modalButtonText}>
              Reset wachtwoord via Email
            </Text>
            <View style={styles.modalCloseIconContainer}>
              <Icon
                name="arrow-forward"
                size={24}
                color="#3772E3"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              // Handle reset via SMS
              router.navigate('/reset-sms');
              toggleModal();
            }}
          >
            <Icon name="chatbubble-outline" size={26} color="#3772E3" />
            <Text style={styles.modalButtonText}>Reset wachtwoord via SMS</Text>
            <View style={styles.modalCloseIconContainer}>
              <Icon
                name="arrow-forward"
                size={24}
                color="#3772E3"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: 75,
    width: 73,
    height: 65,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    gap: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 17,
    color: '#000',
  },
  arrowIcon: {
    marginLeft: 'auto',
    color: '#fff',
  },
  modalCloseIconContainer: {
    backgroundColor: '#3772E3',
    borderRadius: 50,
    padding: 7,
    marginLeft: 35,
  },
});
