import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Share, Modal, TextInput } from 'react-native';
import { Threads } from '../types';
import { useThreads } from '../context/ThreadsContext';

interface Props {
  thread: Threads;
  onLike: () => void;
}

export const ThreadsCard: React.FC<Props> = ({ thread, onLike }) => {
  const { addReply } = useThreads();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleProfileClick = () => {
    Alert.alert('Профіль', `Перехід у профіль: ${thread.authorName}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Дивись, що пише ${thread.authorName} у Threads: "${thread.text}"`,
      });
    } catch (error: any) {
      Alert.alert('Помилка', error.message);
    }
  };

  const submitComment = () => {
    if (commentText.trim()) {
      addReply(thread.id, commentText); // Сохраняем коммент в глобальный стейт
      setShowCommentModal(false);
      setCommentText('');
      Alert.alert('Успіх', 'Ваша відповідь опублікована і додана у профіль!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfileClick}>
        <Image source={{ uri: thread.authorAvatar }} style={styles.avatar} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleProfileClick}>
            <Text style={styles.author}>{thread.authorName}</Text>
          </TouchableOpacity>
          <Text style={styles.time}>{thread.createdAt}</Text>
        </View>

        <Text style={styles.text}>{thread.text}</Text>

        {thread.imageUri && (
          <Image source={{ uri: thread.imageUri }} style={styles.postImage} />
        )}

        <View style={styles.actions}>
          <TouchableOpacity onPress={onLike}>
            <Text style={styles.actionIcon}>{thread.isLiked ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCommentModal(true)}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Репост', 'Тред успішно додано до вашого профілю!')}>
            <Text style={styles.actionIcon}>🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Text style={styles.actionIcon}>✈️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setShowCommentModal(true)}>
          <Text style={styles.stats}>
            {thread.repliesCount} відповідей · {thread.likesCount} вподобань
          </Text>
        </TouchableOpacity>
      </View>

      {/* Модальное окно для комментария */}
      <Modal visible={showCommentModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowCommentModal(false)}>
                <Text style={styles.cancelText}>Скасувати</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Відповідь</Text>
              <TouchableOpacity onPress={submitComment}>
                <Text style={styles.postText}>Опублікувати</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder={`Відповісти ${thread.authorName}...`}
              multiline
              autoFocus
              value={commentText}
              onChangeText={setCommentText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#e2e8f0' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  content: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  author: { fontWeight: 'bold', fontSize: 15 },
  time: { color: '#64748b', fontSize: 13 },
  text: { fontSize: 15, lineHeight: 20, marginBottom: 8 },
  postImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  actions: { flexDirection: 'row', gap: 16, marginVertical: 6 },
  actionIcon: { fontSize: 18 },
  stats: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, minHeight: 300, padding: 16 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  cancelText: { fontSize: 16 },
  modalTitle: { fontWeight: 'bold', fontSize: 16 },
  postText: { color: '#0066cc', fontWeight: 'bold', fontSize: 16 },
  commentInput: { fontSize: 16, minHeight: 100, textAlignVertical: 'top' },
});