import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { colors } from '@/ui';

import FishSearchBar from '../search-bar';

interface addFishModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddFishModal: React.FC<addFishModalProps> = ({
  visible,
  onClose,
}) => {
  const handleClose = () => {
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
          <>
            <FishSearchBar />
          </>
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
