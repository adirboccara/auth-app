import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/nativewindui/button';
import { Input } from '@/components/nativewindui/input';
import { Label } from '@/components/nativewindui/label';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';
import { API_BASE_URL } from '@/lib/api';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      showAlert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      console.log('Login attempt:', { username, apiUrl: API_BASE_URL });
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Login response status:', response.status, response.statusText);

      if (response.ok) {
        try {
          const data = await response.json();
          console.log('Login success data:', data);
          
          if (data.success && data.user) {
            setUser(data.user);
            console.log('User set, navigating to /home');
            router.replace('/home');
          } else {
            showAlert('Error', 'Invalid response from server');
          }
        } catch (parseError) {
          console.error('Failed to parse success response:', parseError);
          showAlert('Error', 'Invalid response from server');
        }
      } else {
        console.log('Login failed status:', response.status);

        if (response.status === 401) {
          showAlert('Error', 'your credentials are incorrect');
        } else if (response.status === 403) {
          showAlert('Error', 'Your account is inactive.');
        } else {
          showAlert('Error', 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login network error:', error);
      showAlert('Error', 'Failed to connect to server. Please check your connection.');
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
            Login
          </ThemedText>

          <View style={styles.form}>
            <View style={styles.fieldContainer}>
              <Label style={styles.label}>Username</Label>
              <Input
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Label style={styles.label}>Password</Label>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Button
              onPress={handleSubmit}
              style={styles.submitButton}
              disabled={loading}
              >
                <Text>{loading ? 'Logging in...' : 'Submit'}</Text>
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
