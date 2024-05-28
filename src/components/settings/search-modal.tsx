/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { colors } from '@/ui';
import { Share } from '@/ui/icons'; // Assuming you have an icon for the device

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
}) => {
  const [deviceFound, setDeviceFound] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setDeviceFound(true);
      }, 5000); // Change state after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or visibility change
    } else {
      setDeviceFound(false);
    }
  }, [visible]);

  const handleClose = () => {
    setDeviceFound(false);
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
          {!deviceFound ? (
            <>
              <Text style={styles.modalText}>Op zoek naar aquariums...</Text>
              <Text style={styles.modalDescription}>
                Fishsee is op zoek naar aquariums die zijn verbonden aan je wifi
                netwerk.
              </Text>
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
              animation="slideInUp"
              duration={500}
              style={styles.deviceCard}
            >
              <Share style={styles.deviceIcon} />
              <Text style={styles.deviceTitle}>1 aquarium gevonden</Text>
              <Text style={styles.deviceDescription}>
                Fishsee heeft 1 apparaat in de buurt gevonden
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
    padding: 35,
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
  modalDescription: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: colors.neutral[500],
  },
  modalText: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },
  searchAnimation: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: colors.primary[500],
  },
  deviceCard: {
    alignItems: 'center',
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
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primary[500],
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
