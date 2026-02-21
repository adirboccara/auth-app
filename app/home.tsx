import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/nativewindui/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';
import { API_BASE_URL } from '@/lib/api';

export default function HomeScreen() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'User not found');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}/deactivate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
        router.replace('/');
      } else if (response.status === 404) {
        Alert.alert('Error', 'User not found');
      } else {
        Alert.alert('Error', 'Failed to deactivate account. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <View style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            Welcome{user?.username ? `, ${user.username}` : ''}
          </ThemedText>

          <View style={styles.form}>
            <Button
              onPress={handleDeleteAccount}
              style={styles.submitButton}
              disabled={loading}
            >
              <Text>{loading ? 'Deactivating...' : 'Delete Account?'}</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    marginBottom: 4,
  },
  submitButton: {
    marginTop: 8,
  },
});
