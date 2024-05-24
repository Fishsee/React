import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as z from 'zod';

import { Button, ControlledInput, Text, TouchableOpacity, View } from '@/ui';

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

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

// eslint-disable-next-line max-lines-per-function
export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="flex-1 p-4" style={{ paddingTop: 208 }}>
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
        secureTextEntry={true}
        style={{ backgroundColor: '#FFF', marginBottom: 20 }}
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
            router.replace('/feed/add-post');
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
              router.navigate('/reset-email');
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
