import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FoodCard from '@/components/dashboard/food-card';
import GraphCard from '@/components/dashboard/graph1-card';
import ProblemsCard from '@/components/dashboard/problems-card';
import { FocusAwareStatusBar } from '@/ui';

const SetupScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [step, showInstructions, fadeAnim]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setShowInstructions(false);
    } else {
      onComplete();
    }
  };

  const handleToggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <Animated.View style={[styles.setupContainer, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Voer eerst deze stappen uit</Text>
      <Text style={styles.setupDescription}>
        {step === 1 && 'Verbind je Bluetooth apparaat.'}
        {step === 2 && 'Stel je profiel in.'}
        {step === 3 && 'Voltooi de setup.'}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonHow}
          onPress={handleToggleInstructions}
        >
          <Text style={styles.buttonTextHow}>Hoe?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Volgende</Text>
        </TouchableOpacity>
      </View>

      {showInstructions && step === 1 && (
        <Animated.View
          style={[styles.instructionsContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.instruction}>
            1. Ga naar de instellingen van je apparaat.
          </Text>
          <Text style={styles.instruction}>
            2. Selecteer 'Bluetooth' en zet het aan.
          </Text>
          <Text style={styles.instruction}>
            3. Zoek naar beschikbare apparaten en selecteer je apparaat.
          </Text>
          <Text style={styles.instruction}>
            4. Volg de instructies op het scherm om de verbinding te voltooien.
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default function Dashboard() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleResetSetup = () => {
    setIsSetupComplete(false);
  };

  if (!isSetupComplete) {
    return <SetupScreen onComplete={() => setIsSetupComplete(true)} />;
  }

  return (
    <ScrollView>
      <View className="flex-1" style={{ paddingBottom: 20 }}>
        <FocusAwareStatusBar />
        <GraphCard />
        <ProblemsCard />
        <FoodCard percentage={50} />
        <Button
          title="Reset Setup (DEBUG)"
          onPress={handleResetSetup}
          color="#007BFF"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  setupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  setupDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonHow: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextHow: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 5,
    color: '#777',
  },
  progressBar: {
    width: '80%',
    marginTop: 20,
  },
});
