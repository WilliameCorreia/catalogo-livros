export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  createdAt: Date;
}

export interface CreateBookInput {
  title: string;
  author: string;
  category: string;
}
