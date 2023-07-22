

export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  content: string | null;
  authorId: string | null;
}