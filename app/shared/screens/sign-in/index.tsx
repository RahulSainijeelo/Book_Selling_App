import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';

export default function SignInScreen() {
  const setRole = useAuthStore((state) => state.setRole);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const [selectedRole, setSelectedRole] = useState<'user' | 'seller' | null>(null);

  const handleLogin = () => {
    if (selectedRole) {
      setRole(selectedRole);
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* UI same as before */}
      <Text style={styles.title}>Book Store Sign In</Text>
      <Text style={styles.subtitle}>Select your role</Text>
      <View style={styles.roleButtons}>
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === 'user' && styles.selected]}
          onPress={() => setSelectedRole('user')}
        >
          <Text style={styles.roleText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, selectedRole === 'seller' && styles.selected]}
          onPress={() => setSelectedRole('seller')}
        >
          <Text style={styles.roleText}>Seller</Text>
        </TouchableOpacity>
      </View>
      <Button disabled={!selectedRole} title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  subtitle: { fontSize: 18, marginBottom: 16 },
  roleButtons: { flexDirection: 'row', marginBottom: 24 },
  roleButton: {
    borderWidth: 1,
    borderColor: '#6200ea',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  selected: {
    backgroundColor: '#6200ea',
  },
  roleText: {
    color: '#6200ea',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
