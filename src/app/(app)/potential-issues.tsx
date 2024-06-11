/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

import PotentialProblemCard from '@/components/potential-problem-card';
import WaterQuality from '@/components/problem-card';
import TipCard from '@/components/tip-card';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';
import { ArrowLeft } from '@/ui/icons';

function Issues() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View style={styles.container}>
          <View className="flex-1 px-4 pb-56" style={{ paddingTop: 60 }}>
            <View className="flex flex-row items-center justify-center">
              <ArrowLeft
                className="absolute left-0 mr-2"
                style={{ position: 'absolute', left: 0 }}
                onPress={() => {
                  router.replace('/');
                }}
              />
              <Text className="text-xl font-semibold color-white">
                Potentiële problemen
              </Text>
            </View>
            <View style={styles.problemContainer}>
              <Image
                source={require('../../../assets/img/sad.png')}
                style={{ width: 120, height: 120 }}
              />
              <Text className="mt-4 text-2xl font-bold text-white">
                Er zijn enkele problemen...
              </Text>
              <Text className="text-xl text-white">
                Er zijn potentiële problemen gedetecteerd.
              </Text>
            </View>
            <SafeAreaView>
              <WaterQuality title="Waterkwaliteit" index={0.8} />
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.potentialSection}>
          <Text className="text-[22px]">Potentiële problemen</Text>
          <View style={styles.potentialProblemRow}>
            <PotentialProblemCard
              icon={require('../../../assets/img/temp.png')}
              problem="30°"
              label="Tempratuur"
              iconWidth={30}
              iconHeight={30}
            />
            <PotentialProblemCard
              icon={require('../../../assets/img/ph.png')}
              problem="7"
              label="PH-Waarde"
              iconWidth={30}
              iconHeight={30}
            />
          </View>
          <View style={styles.potentialProblemRow}>
            <PotentialProblemCard
              icon={require('../../../assets/img/troebel.png')}
              problem="Matig"
              label="Troebelheid"
              iconWidth={26}
              iconHeight={30}
            />
            <PotentialProblemCard
              icon={require('../../../assets/img/voedsel.png')}
              problem="Matig"
              label="Voedsel"
              iconWidth={26}
              iconHeight={26}
            />
          </View>
        </View>
        <View style={styles.tipsSection}>
          <Text className="text-[22px]">Tips</Text>
          <TipCard
            icon={require('../../../assets/img/sparkles.png')}
            text="Controleer je voedingssysteem regelmatig"
            iconWidth={30}
            iconHeight={30}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3a75e1',
    height: 450,
    borderRadius: 25,
  },

  problemContainer: {
    marginTop: 85,
    marginBottom: 20,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  potentialSection: {
    marginTop: 60,
    marginLeft: 40,
  },
  potentialProblem: {
    width: 150,
    height: 70,
    backgroundColor: '#fff',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  potentialProblemText: {
    width: 105,
    marginLeft: 5,
  },
  potentialProblemRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
  },
  tipsSection: {
    marginTop: 40,
    marginLeft: 40,
    paddingBottom: 40,
  },
});

export default Issues;
