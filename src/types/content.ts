export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
}

export interface WorkCollection {
  id: string;
  title: string;
  coverImage: string;
  photos: PhotoItem[];
  /** Supports YYYY, YYYY-MM, or YYYY-MM-DD */
  date: string;
  description?: string;
  order: number;
}

export interface EssayArticle {
  id: string;
  title: string;
  /** ISO date string YYYY-MM-DD */
  publishedAt: string;
  body: string;
  supportingImage?: string;
  supportingImageCaption?: string;
  excerpt?: string;
  order: number;
}

export type SortOrder = 'custom' | 'newest' | 'oldest';

export type AppSection = 'works' | 'essays' | 'about';

export interface ContentStore {
  works: WorkCollection[];
  essays: EssayArticle[];
}
