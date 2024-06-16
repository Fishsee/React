import React, { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import FishItem from './fish-item';

const FishSearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [counter, setCounter] = useState(0);
  const [selectedFish, setSelectedFish] = useState<any[]>([]);

  const fishData = [
    {
      name: 'Goudvis',
      type: 'zoetwater',
      image: require('../../assets/img/goldfish.png'),
    },
    // Add more fish objects here
  ];

  const filteredFish = fishData.filter((fish) =>
    fish.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const increaseCounter = () => setCounter(counter + 1);
  const decreaseCounter = () => setCounter(counter > 0 ? counter - 1 : 0);

  const addFish = (fish: any) => {
    setSelectedFish([...selectedFish, { ...fish, quantity: counter }]);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Vul uw vis in"
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.counterContainer}>
          <Button title="-" onPress={decreaseCounter} />
          <Text style={styles.counterText}>{counter}</Text>
          <Button title="+" onPress={increaseCounter} />
        </View>
      </View>
      <FlatList
        data={filteredFish}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <FishItem
            name={item.name}
            type={item.type}
            image={item.image}
            onAdd={() => addFish(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchBar: {
    flex: 1,
    padding: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    padding: 5,
  },
  counterText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default FishSearchBar;
