/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

import PotentialProblemCard from '@/components/potential-problem-card';
import WaterQuality from '@/components/problem-card';
import TipCard from '@/components/tip-card';
import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';
import { ArrowLeft } from '@/ui/icons';

interface DataItem {
  predicted_values: number[];
}

const iconMap: { [key: string]: any } = {
  acidity: require('../../../assets/img/ph.png'),
  turbidity: require('../../../assets/img/troebel.png'),
  flow: require('../../../assets/img/voedsel.png'),
  waterlevel: require('../../../assets/img/temp.png'),
};

function Issues() {
  const [data, setData] = useState<{ [key: string]: DataItem } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [wqi, setWqi] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://fishsee.aeternaserver.net/api/predict'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
        setWqi(result.wqi);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

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
              <Text style={{ fontSize: 18, color: '#fff' }}>
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
              <WaterQuality title="Waterkwaliteit" index={wqi || 0} />
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.potentialSection}>
          <Text style={{ fontSize: 22 }}>Potentiële problemen</Text>
          <View style={styles.potentialProblemRow}>
            {data &&
              Object.keys(data).map((key, index) => {
                const item = data[key];
                if (key !== 'wqi') {
                  return (
                    <PotentialProblemCard
                      key={index}
                      icon={iconMap[key]}
                      problem={item.predicted_values[0].toString()}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      iconWidth={30}
                      iconHeight={30}
                      style={styles.problemCard}
                    />
                  );
                }
                return null;
              })}
          </View>
        </View>
        <View style={styles.tipsSection}>
          <Text style={{ fontSize: 22 }}>Tips</Text>
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
    marginLeft: 15,
  },
  potentialProblemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'stretch',
    gap: 15,
  },

  problemCard: {
    flex: 1,
    margin: 5,
  },
  tipsSection: {
    marginTop: 40,
    marginLeft: 15,
    paddingBottom: 40,
  },
  warningContainer: {
    padding: 10,
    backgroundColor: '#ffdddd',
    borderRadius: 10,
    marginVertical: 5,
    flex: 1,
  },
});

export default Issues;
