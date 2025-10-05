export type Publication = {
  id: number;
  title: string;
  cover: { url: string }[];
  publishedAt?: string;
  category?: string;
  description?: string;
};