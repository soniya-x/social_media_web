export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  profileImage: string;
  bio: string;
  followers: string[];
  following: string[];
}