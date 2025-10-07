export type Publication = {
  id: number;
  Title: string;
  Cover: { url: string };
  publishedAt?: string;
  Description?: string;
};