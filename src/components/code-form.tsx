/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as z from 'zod';

import { Button, Text, TouchableOpacity, View } from '@/ui';

const schema = z.object({
  code: z
    .string()
    .length(6, 'Code must be exactly 6 digits')
    .regex(/^\d+$/, 'Code must be numeric'),
});

export type FormType = z.infer<typeof schema>;

export type CodeFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const CodeForm = ({ onSubmit = () => {} }: CodeFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const digit1Ref = useRef<TextInput>(null);
  const digit2Ref = useRef<TextInput>(null);
  const digit3Ref = useRef<TextInput>(null);
  const digit4Ref = useRef<TextInput>(null);
  const digit5Ref = useRef<TextInput>(null);
  const digit6Ref = useRef<TextInput>(null);

  return (
    <View className="flex-1 p-4">
      <Text
        testID="form-title"
        className="text-b pb-6 text-[30px] font-bold"
        style={{ paddingTop: 200, fontSize: 30 }}
      >
        Wachtwoord vergeten?
      </Text>

      <Text
        testID="form-description"
        className="text-b pb-6 text-[16px]"
        style={{ paddingBottom: 30, fontSize: 16 }}
      >
        Vul de 6-cijferige code in die naar je e-mail is gestuurd.
      </Text>

      <View style={styles.codeInputContainer}>
        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, value } }) => (
            <>
              {[
                digit1Ref,
                digit2Ref,
                digit3Ref,
                digit4Ref,
                digit5Ref,
                digit6Ref,
              ].map((ref, index) => (
                <TextInput
                  key={index}
                  ref={ref}
                  style={[
                    styles.codeInput,
                    focusedInput === index && styles.codeInputFocused,
                  ]}
                  maxLength={1}
                  keyboardType="numeric"
                  value={value?.[index] || ''}
                  onFocus={() => setFocusedInput(index)}
                  onBlur={() => setFocusedInput(null)}
                  onChangeText={(text) => {
                    const newValue = value ? value.split('') : [];
                    newValue[index] = text;
                    onChange(newValue.join(''));
                    if (text) {
                      if (index < 5) {
                        ref.current?.focus();
                      } else {
                        handleSubmit(onSubmit)(); // Trigger the submit when the last digit is filled
                      }
                    } else if (index > 0) {
                      ref.current?.focus();
                    }
                  }}
                />
              ))}
            </>
          )}
        />
      </View>

      <Text style={styles.resendText}>
        Geen code gekregen?{' '}
        <Text
          style={styles.resendLink}
          onPress={() => {
            /* Handle resend code */
          }}
        >
          Stuur opnieuw
        </Text>
      </Text>

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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 55,
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10, // Rounded borders
  },
  codeInputFocused: {
    borderColor: '#3772E3', // Blue border when focused
  },
  resendText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  resendLink: {
    color: '#3772E3', // Blue color for the link
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
