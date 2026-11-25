import type { EssayArticle, SortOrder, WorkCollection } from '../types/content';

const INDONESIAN_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

/**
 * Converts a year ("2022"), year-month ("2022-07"), or ISO date ("2022-07-03")
 * into a numeric timestamp for deterministic chronological sorting.
 */
export function parseSortableDate(raw: string): number {
  const trimmed = raw.trim();
  if (!trimmed) return 0;

  // YYYY
  if (/^\d{4}$/.test(trimmed)) {
    return Date.UTC(Number(trimmed), 0, 1);
  }

  // YYYY-MM
  const ym = /^(\d{4})-(\d{2})$/.exec(trimmed);
  if (ym) {
    return Date.UTC(Number(ym[1]), Number(ym[2]) - 1, 1);
  }

  // YYYY-MM-DD
  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (ymd) {
    return Date.UTC(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));
  }

  const parsed = Date.parse(trimmed);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats a date or year string cleanly in Indonesian editorial style.
 * - "2022" -> "2022"
 * - "2022-07" -> "Juli 2022"
 * - "2022-07-03" -> "3 Juli 2022"
 */
export function formatDisplayDate(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  if (/^\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  const ym = /^(\d{4})-(\d{2})$/.exec(trimmed);
  if (ym) {
    const monthIndex = Number(ym[2]) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${INDONESIAN_MONTHS[monthIndex]} ${ym[1]}`;
    }
  }

  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (ymd) {
    const monthIndex = Number(ymd[2]) - 1;
    const day = Number(ymd[3]);
    if (monthIndex >= 0 && monthIndex < 12 && day >= 1 && day <= 31) {
      return `${day} ${INDONESIAN_MONTHS[monthIndex]} ${ymd[1]}`;
    }
  }

  return trimmed;
}

/**
 * Extracts a 4-digit year from a date string if present.
 */
export function extractYear(raw: string): string {
  const match = /(\d{4})/.exec(raw.trim());
  return match ? match[1] : raw.trim();
}

export function filterAndSortWorks(
  works: WorkCollection[],
  query: string,
  sortOrder: SortOrder
): WorkCollection[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = normalizedQuery
    ? works.filter((item) => item.title.toLowerCase().includes(normalizedQuery))
    : [...works];

  return filtered.sort((a, b) => {
    if (sortOrder === 'newest') {
      const diff = parseSortableDate(b.date) - parseSortableDate(a.date);
      return diff !== 0 ? diff : a.order - b.order;
    }
    if (sortOrder === 'oldest') {
      const diff = parseSortableDate(a.date) - parseSortableDate(b.date);
      return diff !== 0 ? diff : a.order - b.order;
    }
    return a.order - b.order;
  });
}

export function filterAndSortEssays(
  essays: EssayArticle[],
  query: string,
  sortOrder: SortOrder
): EssayArticle[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = normalizedQuery
    ? essays.filter((item) => item.title.toLowerCase().includes(normalizedQuery))
    : [...essays];

  return filtered.sort((a, b) => {
    if (sortOrder === 'newest') {
      const diff = parseSortableDate(b.publishedAt) - parseSortableDate(a.publishedAt);
      return diff !== 0 ? diff : a.order - b.order;
    }
    if (sortOrder === 'oldest') {
      const diff = parseSortableDate(a.publishedAt) - parseSortableDate(b.publishedAt);
      return diff !== 0 ? diff : a.order - b.order;
    }
    return a.order - b.order;
  });
}

export function normalizeOrder<T extends { order: number }>(items: T[]): T[] {
  return items.map((item, idx) => ({ ...item, order: idx }));
}

export function reorderItems<T extends { order: number }>(
  items: T[],
  index: number,
  direction: 'up' | 'down'
): T[] {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || index >= sorted.length || targetIndex < 0 || targetIndex >= sorted.length) {
    return normalizeOrder(sorted);
  }
  const next = [...sorted];
  const [moved] = next.splice(index, 1);
  next.splice(targetIndex, 0, moved);
  return normalizeOrder(next);
}

export function moveItemToIndex<T extends { order: number }>(
  items: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  if (
    fromIndex < 0 ||
    fromIndex >= sorted.length ||
    toIndex < 0 ||
    toIndex >= sorted.length ||
    fromIndex === toIndex
  ) {
    return normalizeOrder(sorted);
  }
  const next = [...sorted];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return normalizeOrder(next);
}

export interface WorkValidationInput {
  title: string;
  date: string;
  coverImage: string;
  photosCount: number;
}

export function validateWorkInput(input: WorkValidationInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.title.trim()) {
    errors.title = 'Judul koleksi wajib diisi.';
  }
  const trimmedDate = input.date.trim();
  if (!trimmedDate) {
    errors.date = 'Tahun atau tanggal wajib diisi.';
  } else if (
    !/^\d{4}$/.test(trimmedDate) &&
    !/^\d{4}-\d{2}$/.test(trimmedDate) &&
    !/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)
  ) {
    errors.date = 'Gunakan format tahun (mis. 2024) atau tanggal (YYYY-MM-DD).';
  }
  if (!input.coverImage.trim() && input.photosCount === 0) {
    errors.coverImage = 'Tambahkan foto cover atau minimal satu foto dalam koleksi.';
  }
  return errors;
}

export interface EssayValidationInput {
  title: string;
  publishedAt: string;
  body: string;
}

export function validateEssayInput(input: EssayValidationInput): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.title.trim()) {
    errors.title = 'Judul tulisan wajib diisi.';
  }
  if (!input.publishedAt.trim()) {
    errors.publishedAt = 'Tanggal publikasi wajib diisi.';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(input.publishedAt.trim())) {
    errors.publishedAt = 'Gunakan format tanggal YYYY-MM-DD.';
  }
  if (!input.body.trim()) {
    errors.body = 'Isi tulisan tidak boleh kosong.';
  }
  return errors;
}

export function estimateReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function generateId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now()}-${random}`;
}
