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
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
});

export type FormType = z.infer<typeof schema>;

export type ForgotPasswordFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

// eslint-disable-next-line max-lines-per-function
export const ForgotPasswordForm = ({
  onSubmit = () => {},
}: ForgotPasswordFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
        className="text-b pb-6 text-[30px] font-bold"
        style={{ paddingTop: 120, fontSize: 30 }}
      >
        Wachtwoord vergeten?
      </Text>

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
        style={{ backgroundColor: '#FFF', marginBottom: 20 }}
      />

      <Button
        testID="reset-password-button"
        label="Reset Password"
        onPress={handleSubmit(onSubmit)}
        style={{ height: 48, backgroundColor: '#3772E3' }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} />

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
            <Text style={styles.modalButtonText}>Reset Password via Email</Text>
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
            <Text style={styles.modalButtonText}>Reset Password via SMS</Text>
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
