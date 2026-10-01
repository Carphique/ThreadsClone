import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { useThreads } from '../context/ThreadsContext';
import { ThreadsCard } from '../components/ThreadsCard';

export const HomeScreen = () => {
  const { threads, toggleLike } = useThreads();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThreadsCard thread={item} onLike={() => toggleLike(item.id)} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});