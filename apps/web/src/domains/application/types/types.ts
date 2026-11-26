export interface StoreProviderProps {
  children: React.ReactNode;
}

export interface ProfileHeaderProps {
  name: string;
  username: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  profileImage: string;
  onEdit: () => void;
  onImageClick: () => void;
}