import React from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

type editProfile = {
  params: {
    itemId: any,
    title: any
  }
}
type DetailsScreenRouteProp = RouteProp<editProfile>;

export default function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation();

  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Decorative Background Shapes */}
      <View style={styles.bgShape1} />
      <View style={styles.bgShape2} />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Item ID: {itemId}</Text>

          <Text style={styles.description}>
            This is a detailed view of the selected item. You can add more
            information, images, or actions related to this specific item here.
          </Text>

          <Text style={styles.info}>
            This screen is part of the Stack Navigation, which means it's
            overlaid on top of the Tab Navigation.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Go Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}