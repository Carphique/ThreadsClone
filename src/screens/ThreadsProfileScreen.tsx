import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThreads } from '../context/ThreadsContext';
import { ThreadsCard } from '../components/ThreadsCard';

export const ThreadsProfileScreen = () => {
  const { threads, toggleLike, userProfile, updateProfile, myReplies } = useThreads();
  const [activeTab, setActiveTab] = useState<'Threads' | 'Replies' | 'Reposts'>('Threads');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editUsername, setEditUsername] = useState(userProfile.username);
  const [editBio, setEditBio] = useState(userProfile.bio);

  const myThreads = threads.filter((t) => t.authorName === userProfile.username);
  const repostedThreads = threads.filter((t) => t.authorName === 'react_dev');

  const openEditModal = () => {
    setEditName(userProfile.name);
    setEditUsername(userProfile.username);
    setEditBio(userProfile.bio);
    setIsEditing(true);
  };

  const saveProfile = () => {
    updateProfile({ name: editName, username: editUsername, bio: editBio });
    setIsEditing(false);
  };

  const renderContent = () => {
    if (activeTab === 'Threads') {
      return (
        <FlatList
          data={myThreads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ThreadsCard thread={item} onLike={() => toggleLike(item.id)} />}
          scrollEnabled={false}
          ListEmptyComponent={<Text style={styles.emptyText}>Тут поки порожньо</Text>}
        />
      );
    } else if (activeTab === 'Replies') {
      return (
        <FlatList
          data={myReplies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const originalThread = threads.find(t => t.id === item.threadId);
            if (!originalThread) return null;
            return (
              <View style={styles.replyWrapper}>
                <View style={styles.myReplyBubble}>
                  <Text style={styles.myReplyLabel}>Ви відповіли:</Text>
                  <Text style={styles.myReplyText}>{item.replyText}</Text>
                </View>
                <ThreadsCard thread={originalThread} onLike={() => toggleLike(originalThread.id)} />
              </View>
            );
          }}
          scrollEnabled={false}
          ListEmptyComponent={<Text style={styles.emptyText}>Ви ще нікому не відповіли</Text>}
        />
      );
    } else if (activeTab === 'Reposts') {
      return (
        <FlatList
          data={repostedThreads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ThreadsCard thread={item} onLike={() => toggleLike(item.id)} />}
          scrollEnabled={false}
          ListEmptyComponent={<Text style={styles.emptyText}>Тут поки порожньо</Text>}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={[{ key: 'header' }]}
        renderItem={() => (
          <View>
            <View style={styles.header}>
              <View style={styles.topRow}>
                <View>
                  <Text style={styles.name}>{userProfile.name}</Text>
                  <Text style={styles.username}>{userProfile.username}</Text>
                </View>
              </View>

              <Text style={styles.bio}>{userProfile.bio}</Text>
              <Text style={styles.followers}>158 підписників</Text>

              <TouchableOpacity style={styles.editBtn} onPress={openEditModal}>
                <Text style={styles.editBtnText}>Редагувати профіль</Text>
              </TouchableOpacity>

              <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setActiveTab('Threads')}>
                  <Text style={[styles.tabText, activeTab === 'Threads' && styles.activeTab]}>Треди</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Replies')}>
                  <Text style={[styles.tabText, activeTab === 'Replies' && styles.activeTab]}>Відповіді</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Reposts')}>
                  <Text style={[styles.tabText, activeTab === 'Reposts' && styles.activeTab]}>Репости</Text>
                </TouchableOpacity>
              </View>
            </View>
            {renderContent()}
          </View>
        )}
      />

      <Modal visible={isEditing} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <Text style={styles.cancelText}>Скасувати</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Редагувати профіль</Text>
              <TouchableOpacity onPress={saveProfile}>
                <Text style={styles.saveText}>Зберегти</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Ім'я</Text>
            <TextInput style={styles.inputField} value={editName} onChangeText={setEditName} />

            <Text style={styles.inputLabel}>Нікнейм</Text>
            <TextInput style={styles.inputField} value={editUsername} onChangeText={setEditUsername} autoCapitalize="none" />

            <Text style={styles.inputLabel}>Про себе (Біо)</Text>
            <TextInput style={[styles.inputField, { minHeight: 60, textAlignVertical: 'top' }]} multiline value={editBio} onChangeText={setEditBio} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 22, fontWeight: 'bold' },
  username: { color: '#64748b', fontSize: 14, marginTop: 2 },
  bio: { fontSize: 15, marginTop: 12 },
  followers: { color: '#94a3b8', fontSize: 13, marginTop: 8 },
  editBtn: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginTop: 16 },
  editBtnText: { fontWeight: '600' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, borderTopWidth: 0.5, borderTopColor: '#eee', paddingTop: 10 },
  tabText: { color: '#94a3b8', fontWeight: '600', fontSize: 15, paddingBottom: 8 },
  activeTab: { color: '#000', borderBottomWidth: 2, borderBottomColor: '#000' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#94a3b8' },
  
  replyWrapper: { borderBottomWidth: 0.5, borderColor: '#eee', paddingBottom: 10, backgroundColor: '#f8fafc' },
  myReplyBubble: { padding: 15, paddingBottom: 0 },
  myReplyLabel: { fontWeight: 'bold', fontSize: 14, color: '#64748b', marginBottom: 4 },
  myReplyText: { fontSize: 15, color: '#000' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, minHeight: 450, padding: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  cancelText: { fontSize: 16 },
  modalTitle: { fontWeight: 'bold', fontSize: 16 },
  saveText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  inputLabel: { fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#64748b' },
  inputField: { fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 8 },
});