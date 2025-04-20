
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  featured?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
}
