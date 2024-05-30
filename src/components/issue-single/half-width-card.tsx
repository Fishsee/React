/* eslint-disable max-lines-per-function */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/ui';

interface HalfWidthCardProps {
  icon: React.ReactElement<{ color?: string }>; // Ensure icon accepts a color prop
  title: string;
  description: string;
  onWhyPress: () => void;
  status: 'primary' | 'secondary';
}

export const HalfWidthCard: React.FC<HalfWidthCardProps> = ({
  icon,
  title,
  description,
  onWhyPress,
  status,
}) => {
  const getStatusStyles = (status: 'primary' | 'secondary') => {
    if (status === 'primary') {
      return {
        card: {
          backgroundColor: '#3772E3',
          borderRadius: 20,
        },
        iconBackground: {
          backgroundColor: 'rgba(255, 255, 255, 0.16)',
        },
        iconColor: '#FFFFFF',
        textColor: '#FFFFFF',
        descriptionColor: 'rgba(255, 255, 255, 0.7)',
        buttonBorderColor: 'rgba(255, 255, 255, 0.5)',
        buttonTextColor: '#FFFFFF',
        buttonBorderRadius: 16,
      };
    } else {
      return {
        card: {
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          borderColor: colors.neutral[200],
          borderWidth: 1,
        },
        iconBackground: {
          backgroundColor: 'rgba(60, 129, 181, 0.16)',
        },
        iconColor: '#222222',
        textColor: '#262626',
        descriptionColor: '#8D8D8D',
        buttonBorderColor: '#3772E3',
        buttonTextColor: '#3772E3',
        buttonBorderRadius: 16,
      };
    }
  };

  const styles = getStatusStyles(status);

  return (
    <View style={[defaultStyles.card, styles.card]}>
      <View style={defaultStyles.iconContainer}>
        <View style={[defaultStyles.iconBackground, styles.iconBackground]}>
          {React.isValidElement(icon) &&
            React.cloneElement(icon, { color: styles.iconColor })}
        </View>
      </View>
      <View style={defaultStyles.textContainer}>
        <Text style={[defaultStyles.title, { color: styles.textColor }]}>
          {title}
        </Text>
        <Text
          style={[
            defaultStyles.description,
            { color: styles.descriptionColor },
          ]}
        >
          {description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onWhyPress}
        style={[
          defaultStyles.whyButton,
          {
            borderColor: styles.buttonBorderColor,
            borderRadius: styles.buttonBorderRadius,
            alignSelf: 'flex-start', // Align button to the left
          },
        ]}
      >
        <Text
          style={[
            defaultStyles.whyButtonText,
            { color: styles.buttonTextColor },
          ]}
        >
          Waarom?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  card: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 20,
    elevation: 5,
    width: '48%',
  },
  iconContainer: {
    alignItems: 'flex-start', // Align icon to the left
    marginBottom: 10,
  },
  iconBackground: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
  textContainer: {
    justifyContent: 'flex-start', // Align text to the left
    alignItems: 'flex-start', // Align text to the left
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left', // Align text to the left
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    marginLeft: 1,
    textAlign: 'left', // Align text to the left
    flexWrap: 'wrap',
  },
  whyButton: {
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  whyButtonText: {
    fontWeight: 'bold',
  },
});

export default HalfWidthCard;
