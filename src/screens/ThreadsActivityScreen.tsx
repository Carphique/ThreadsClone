import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface Activity {
  id: string;
  user: string;
  avatar: string;
  type: 'like' | 'reply' | 'follow';
  time: string;
}

export const MOCK_ACTIVITY: Activity[] = [
  { 
    id: '1', 
    user: 'carphique', 
    avatar: 'https://ui-avatars.com/api/?name=carphique&background=random', 
    type: 'like', 
    time: '5хв' 
  },
  { 
    id: '2', 
    user: 'affuess', 
    avatar: 'https://ui-avatars.com/api/?name=affuess&background=random', 
    type: 'follow', 
    time: '12хв' 
  },
  { 
    id: '3', 
    user: '_.katrizz._', 
    avatar: 'https://ui-avatars.com/api/?name=katrizz&background=random', 
    type: 'reply', 
    time: '1год' 
  },
];

export const ThreadsActivityScreen = () => {
  const getMessage = (type: Activity['type']) => {
    switch (type) {
      case 'like': return 'вподобав(-ла) ваш тред';
      case 'reply': return 'відповів(-ла) на ваш тред';
      case 'follow': return 'почав(-ла) стежити за вами';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.headerTitle}>Активність</Text>
      
      <FlatList
        data={MOCK_ACTIVITY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                <Text style={styles.username}>{item.user} </Text>
                {getMessage(item.type)}
              </Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', marginHorizontal: 16, marginTop: 12, marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  textContainer: { flex: 1 },
  text: { fontSize: 14, color: '#000' },
  username: { fontWeight: 'bold' },
  time: { color: '#94a3b8', fontSize: 12, marginLeft: 8 },
});