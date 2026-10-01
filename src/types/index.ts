export interface Threads {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  imageUri?: string;
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
  createdAt: string;
}