// ph-pop-up.tsx
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ArrowLeft } from '@/ui/icons';

interface PhPopUpProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PhPopUp: React.FC<PhPopUpProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              width: '100%',
              marginBottom: 15,
            }}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ArrowLeft />
            </TouchableOpacity>
            <Text
              style={{
                width: '80%',
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              PH+ Tablet
            </Text>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 10,
    width: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'red',
  },
});
