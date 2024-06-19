/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Fish {
  name: string;
}

interface StoredFish {
  name: string;
  quantity: number;
}

const fishes: Fish[] = require('./fishes.json');

interface FishSearchBarProps {
  storedFishes: StoredFish[];
  setStoredFishes: React.Dispatch<React.SetStateAction<StoredFish[]>>;
}

const FishSearchBar: React.FC<FishSearchBarProps> = ({
  storedFishes,
  setStoredFishes,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredFishes, setFilteredFishes] = useState<Fish[]>([]);
  const [counter, setCounter] = useState(0);

  const increaseCounter = () => setCounter(counter + 1);
  const decreaseCounter = () => setCounter(Math.max(counter - 1, 0));

  useEffect(() => {
    if (searchText === '') {
      setFilteredFishes([]);
    } else {
      const results = fishes.filter((fish) =>
        fish.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredFishes(results);
    }
  }, [searchText]);

  const handleFishPress = (fish: Fish) => {
    const existingFish = storedFishes.find((item) => item.name === fish.name);
    if (existingFish) {
      setStoredFishes((prevStoredFishes) =>
        prevStoredFishes.map((item) =>
          item.name === fish.name
            ? { ...item, quantity: item.quantity + counter }
            : item
        )
      );
    } else if (counter > 0) {
      setStoredFishes((prevStoredFishes) => [
        ...prevStoredFishes,
        { name: fish.name, quantity: counter },
      ]);
    }
  };

  const handleMinusPress = (fishName: string) => {
    setStoredFishes((prevStoredFishes) =>
      prevStoredFishes
        .map((item) =>
          item.name === fishName
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.listContainer}>
        {filteredFishes.length > 0 ? (
          <FlatList
            data={filteredFishes}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleFishPress(item)}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noResultsText}>Geen resultaten gevonden</Text>
        )}
      </View>
      <View style={styles.storedFishesContainer}>
        <Text style={styles.storedFishesTitle}>Huidige Vissen:</Text>
        {storedFishes.map((fish) => (
          <View key={fish.name} style={styles.storedFishRow}>
            <Text style={styles.storedFishText}>
              {fish.name}: {fish.quantity}
            </Text>
            <TouchableOpacity onPress={() => handleMinusPress(fish.name)}>
              <Text style={styles.minusButton}>-</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    height: 'auto',
  },
  searchBar: {
    width: 200,
    height: 40,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 10,
  },
  counterText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  listContainer: {
    marginTop: 10,
    height: 200,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  itemText: {
    fontSize: 16,
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  storedFishesContainer: {
    marginTop: 20,
  },
  storedFishesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storedFishRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storedFishText: {
    fontSize: 16,
    marginTop: 5,
  },
  minusButton: {
    color: 'red',
    fontSize: 24,
  },
});

export default FishSearchBar;
