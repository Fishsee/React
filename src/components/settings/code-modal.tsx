/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as z from 'zod';

import { colors } from '@/ui';
import { Checkmark } from '@/ui/icons/checkmark';

const schema = z.object({
  code: z
    .string()
    .length(6, 'Code must be exactly 6 digits')
    .regex(/^\d+$/, 'Code must be numeric'),
});

export type FormType = z.infer<typeof schema>;

interface CodeModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ visible, onClose }) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isChecking, setIsChecking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [focusedInput, setFocusedInput] = useState<number | null>(null);

  const digitRefs = useRef<Array<TextInput | null>>([]);

  const handleCodeSubmit = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setIsConnected(true);
    }, 3000); // Simulate checking duration
  };

  const handleClose = () => {
    setIsChecking(false);
    setIsConnected(false);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {!isChecking && !isConnected ? (
            <>
              <Text style={styles.modalText}>Voer de koppelcode in</Text>
              <Text style={styles.modalDescription}>
                Voer de 6-cijferige code in die te vinden is op de achterkant
                van de Fishsee
              </Text>
              <View style={styles.codeInputContainer}>
                <Controller
                  control={control}
                  name="code"
                  render={({ field: { onChange, value } }) => (
                    <>
                      {[...Array(6)].map((_, index) => (
                        <TextInput
                          key={index}
                          ref={(el) => (digitRefs.current[index] = el)}
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
                            if (text && index < 5) {
                              digitRefs.current[index + 1]?.focus();
                            } else if (!text && index > 0) {
                              digitRefs.current[index - 1]?.focus();
                            }
                            if (newValue.join('').length === 6) {
                              handleSubmit(handleCodeSubmit)(); // Trigger the submit when the last digit is filled
                            }
                          }}
                        />
                      ))}
                    </>
                  )}
                />
              </View>
            </>
          ) : isChecking ? (
            <>
              <Text style={styles.modalText}>Controleren...</Text>
              <Animatable.View
                animation="rotate"
                iterationCount="infinite"
                duration={2000}
                style={styles.searchAnimation}
              >
                <Animatable.View
                  animation="pulse"
                  iterationCount="infinite"
                  duration={1000}
                  style={styles.circle}
                />
              </Animatable.View>
            </>
          ) : (
            <Animatable.View
              animation="fadeIn"
              duration={500}
              style={styles.deviceCard}
            >
              <Checkmark style={styles.deviceIcon} />
              <Text style={styles.deviceTitle}>Verbonden</Text>
              <Text style={styles.deviceDescription}>
                Je bent succesvol verbonden met het aquarium.
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingBottom: 40,
    paddingTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
  modalDescription: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: colors.neutral[500],
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  codeInput: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10, // Rounded borders
    marginHorizontal: 2, // Add some spacing between inputs
  },
  codeInputFocused: {
    borderColor: colors.primary[500], // Blue border when focused
    backgroundColor: '#ffffff', // White background when focused
  },
  searchAnimation: {
    padding: 20,
    marginTop: 20,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: colors.primary[500],
  },
  deviceCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  deviceTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deviceDescription: {
    fontSize: 16,
    color: colors.neutral[500],
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: colors.primary[500],
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
