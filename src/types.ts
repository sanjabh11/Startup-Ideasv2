export interface StartupIdea {
  id: string;
  title: string;
  description: string;
  userId: string;
  rating: number;
  ratings: { userId: string; rating: number }[];
  comments: Comment[];
}

export interface Comment {
  id?: string;
  userId: string;
  text: string;
  createdAt: Date;
}