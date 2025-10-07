export type Publication = {
  id: number;
  title: string;
  pdf: { url: string };
  cover: { url: string };
  publishedAt?: string;
  description?: string;
};