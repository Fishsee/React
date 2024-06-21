import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ArrowRight } from '@/ui/icons';

const Card = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Problemen</Text>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.updatedText}>Laatst geüpdate: nu</Text>
        </View>
        <Text style={styles.problemText}>Er zijn enkele problemen...</Text>
        <TouchableOpacity onPress={() => router.navigate('/issue-single')}>
          <View style={styles.problemCard}>
            <Icon name="info-circle" size={24} color="white" />
            <View style={styles.problemDetails}>
              <Text style={styles.problemTitle}>pH waarde laag</Text>
              <Text style={styles.problemSubtitle}>Urgent</Text>
            </View>
            <ArrowRight color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate('/issue-single')}>
          <View style={styles.problemCard}>
            <Icon name="info-circle" size={24} color="white" />
            <View style={styles.problemDetails}>
              <Text style={styles.problemTitle}>pH waarde laag</Text>
              <Text style={styles.problemSubtitle}>Urgent</Text>
            </View>
            <ArrowRight color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => router.navigate('/issues')}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          gap: 10,
        }}
      >
        <Text style={styles.seeAllText}>Zie alles</Text>
        <ArrowRight color="#3D7DF8" className="arrowRightIcon" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updatedText: {
    color: 'grey',
    paddingTop: 10,
    marginBottom: 4,
  },

  problemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  problemCard: {
    backgroundColor: '#3D7DF8',
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  problemDetails: {
    marginLeft: 15,
    flex: 1,
  },
  problemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  problemSubtitle: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    marginLeft: 5,
  },
  seeAllText: {
    color: '#3D7DF8',
    textAlign: 'right',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default Card;
