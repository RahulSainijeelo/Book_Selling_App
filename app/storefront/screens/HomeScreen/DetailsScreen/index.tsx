import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation();
  
  const { itemId, title } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Item ID: {itemId}</Text>
        
        <Text style={styles.description}>
          This is a detailed view of the selected item. You can add more 
          information, images, or actions related to this specific item here.
        </Text>
        
        <Text style={styles.info}>
          This screen is part of the Stack Navigation, which means it's 
          overlaid on top of the Tab Navigation. You can see the back 
          button in the header to return to the Home tab.
        </Text>
        
        <Button
          title="Go Back to Home"
          onPress={() => navigation.goBack()}
          color="#6200ea"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6200ea',
    fontWeight: '600',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 24,
    fontStyle: 'italic',
  },
});
