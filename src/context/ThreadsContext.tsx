import React, { createContext, useContext, useState } from 'react';
import { Threads } from '../types';

interface UserProfile {
  name: string;
  username: string;
  bio: string;
}

interface ThreadsContextType {
  threads: Threads[];
  addThread: (text: string, imageUri?: string) => void;
  toggleLike: (id: string) => void;
  userProfile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  myReplies: { threadId: string; replyText: string }[];
  addReply: (threadId: string, text: string) => void;
}

const ThreadsContext = createContext<ThreadsContextType | undefined>(undefined);

export const ThreadsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Мій Профіль',
    username: 'my_profile',
    bio: 'Розробник на React Native | Створюю клон Threads'
  });

  const [threads, setThreads] = useState<Threads[]>([
    { id: '1', authorName: 'zuck', authorAvatar: 'https://ui-avatars.com/api/?name=zuck&background=random', text: 'Вітаємо у Threads!', likesCount: 1420, repliesCount: 312, isLiked: false, createdAt: '2 год' },
    { id: '2', authorName: 'react_dev', authorAvatar: 'https://ui-avatars.com/api/?name=react_dev&background=random', text: 'Створюємо власну копію Threads на React Native', likesCount: 89, repliesCount: 12, isLiked: false, createdAt: '5 год' },
  ]);

  const [myReplies, setMyReplies] = useState<{ threadId: string; replyText: string }[]>([]);

  const updateProfile = (profile: UserProfile) => setUserProfile(profile);

  const addThread = (text: string, imageUri?: string) => {
    const newThread: Threads = {
      id: Date.now().toString(),
      authorName: userProfile.username,
      authorAvatar: `https://ui-avatars.com/api/?name=${userProfile.username}&background=random`,
      text,
      imageUri,
      likesCount: 0,
      repliesCount: 0,
      isLiked: false,
      createdAt: 'Щойно',
    };
    setThreads((prev) => [newThread, ...prev]);
  };

  const toggleLike = (id: string) => {
    setThreads((prev) => prev.map((item) => item.id === id ? { ...item, isLiked: !item.isLiked, likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1 } : item));
  };

  const addReply = (threadId: string, text: string) => {
    setMyReplies((prev) => [{ threadId, replyText: text }, ...prev]);
    // Увеличиваем счетчик комментов под оригинальным постом
    setThreads((prev) => prev.map((item) => item.id === threadId ? { ...item, repliesCount: item.repliesCount + 1 } : item));
  };

  return (
    <ThreadsContext.Provider value={{ threads, addThread, toggleLike, userProfile, updateProfile, myReplies, addReply }}>
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreads = () => {
  const context = useContext(ThreadsContext);
  if (!context) throw new Error('useThreads має використовуватись усередині ThreadsProvider');
  return context;
};