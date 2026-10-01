import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  followers: string;
}

const MOCK_USERS: User[] = [
  { 
    id: '1', 
    username: 'danya_m6', 
    name: 'Данііл', 
    avatar: 'https://ui-avatars.com/api/?name=danya_m6&background=random', 
    followers: '12.4k' 
  },
  { 
    id: '2', 
    username: 'ggvp670', 
    name: 'Олексій', 
    avatar: 'https://ui-avatars.com/api/?name=ggvp670&background=random', 
    followers: '8.1k' 
  },
  { 
    id: '3', 
    username: 'xydessa', 
    name: 'xyddessa news', 
    avatar: 'https://ui-avatars.com/api/?name=xydessa&background=random', 
    followers: '45.2k' 
  },
];

export const ThreadsSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const toggleFollow = (id: string) => {
    setFollowing(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredUsers = MOCK_USERS.filter(
    (u) => u.username.includes(searchQuery.toLowerCase()) || u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.headerTitle}>Пошук</Text>
      
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Пошук користувачів..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.followers}>{item.followers} підписників</Text>
            </View>
            <TouchableOpacity 
              style={[styles.followBtn, following[item.id] && styles.followingBtn]}
              onPress={() => toggleFollow(item.id)}
            >
              <Text style={[styles.followText, following[item.id] && styles.followingText]}>
                {following[item.id] ? 'Відстежується' : 'Стежити'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', marginHorizontal: 16, marginTop: 12 },
  searchBar: { padding: 16 },
  input: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10, fontSize: 16 },
  userCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  userInfo: { flex: 1 },
  username: { fontWeight: 'bold', fontSize: 15 },
  name: { color: '#64748b', fontSize: 14 },
  followers: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  followBtn: { borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  followingBtn: { backgroundColor: '#000', borderColor: '#000' },
  followText: { fontWeight: '600', color: '#000' },
  followingText: { color: '#fff' },
});