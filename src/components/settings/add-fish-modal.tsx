// add-fish-modal.tsx
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

import FishSearchBar from './search-bar'; // Zorg ervoor dat dit pad correct is

interface AddFishModalProps {
  visible: boolean;
  onClose: () => void;
}

interface StoredFish {
  name: string;
  quantity: number;
}

export const AddFishModal: React.FC<AddFishModalProps> = ({
  visible,
  onClose,
}) => {
  const [storedFishes, setStoredFishes] = useState<StoredFish[]>([]);

  const handleSendToDatabase = async () => {
    try {
      // Hier voeg je de werkelijke API-aanroep toe
      // Bijvoorbeeld:
      // await fetch('https://your-api-endpoint.com/save', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(storedFishes),
      // });

      console.log('Data sent to the database:', storedFishes);
      alert('De gegevens zijn succesvol naar de database gestuurd!');
    } catch (error) {
      console.error('Error sending data to the database:', error);
      alert('Er is een fout opgetreden bij het verzenden van de gegevens.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FishSearchBar
            storedFishes={storedFishes}
            setStoredFishes={setStoredFishes}
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Button title="Sla op" onPress={handleSendToDatabase} />
            <Button title="Terug" onPress={handleClose} />
          </View>
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
});

export default AddFishModal;
