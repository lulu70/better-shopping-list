import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import theme from './constants/theme';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Better Shopping List</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  header: {
    fontSize: theme.fontSize.fontSize_24,
    fontWeight: theme.fontWeight.bold,
    marginTop: theme.spacing.spacing_20,
  },
});
