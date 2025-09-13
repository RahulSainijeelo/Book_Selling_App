import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { TabParamList } from '../navigation/AppNavigator';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
type ProfileScreenNavigationProp = NativeStackNavigationProp<TabParamList>;

export default function Profile(){
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleEditProfile = () => {
    navigation.navigate('Edit Profile', {
      userId: 123,
      currentName: 'John Doe',
    })};
  return(
    <View style={styles2.container}>
      <View style={styles2.profileCard}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120/6200ea/ffffff?text=JD' }}
          style={styles2.avatar}
        />
        <Text style={styles2.name}>John Doe</Text>
        <Text style={styles2.email}>john.doe@example.com</Text>
        <Text style={styles2.bio}>
          React Native developer passionate about creating amazing mobile experiences.
        </Text>
        
        <View style={styles2.statsContainer}>
          <View style={styles2.statItem}>
            <Text style={styles2.statNumber}>42</Text>
            <Text style={styles2.statLabel}>Projects</Text>
          </View>
          <View style={styles2.statItem}>
            <Text style={styles2.statNumber}>1.2k</Text>
            <Text style={styles2.statLabel}>Followers</Text>
          </View>
          <View style={styles2.statItem}>
            <Text style={styles2.statNumber}>256</Text>
            <Text style={styles2.statLabel}>Following</Text>
          </View>
        </View>

        <Button
          title="Edit Profile"
          onPress={handleEditProfile}
          color="#6200ea"
        />
      </View>
    </View>
  )
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
})
