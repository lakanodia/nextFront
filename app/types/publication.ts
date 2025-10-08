export type PublicationType = {
  slug: string; // whast this should be ?
  contentHtml: string; // Used only in detail page
  title: string; // Both on detail and list page
  pdf_url: string; // Both on detail and list page
  cover_photo: string; // Both on detail and list page
  publishedAt: string; // Both on detail and list page
  description?: string; // Only on list page
};
