import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from "./ProfileStyles"
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://via.placeholder.com/120/6200ea/ffffff?text=JD' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        <Text style={styles.bio}>
          React Native developer passionate about creating amazing mobile experiences.
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>256</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
    </View>
  );
}