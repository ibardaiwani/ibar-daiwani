import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateReadingMinutes,
  filterAndSortEssays,
  filterAndSortWorks,
  formatDisplayDate,
  moveItemToIndex,
  parseSortableDate,
  reorderItems,
  validateEssayInput,
  validateWorkInput,
} from './contentLogic';
import type { EssayArticle, WorkCollection } from '../types/content';

const sampleWorks: WorkCollection[] = [
  {
    id: 'w1',
    title: 'Prambanan Jazz 2022',
    coverImage: '/a.jpg',
    photos: [{ id: 'p1', url: '/a.jpg' }],
    date: '2022-07-03',
    order: 0,
  },
  {
    id: 'w2',
    title: 'NonaRia at Prambanan Jazz 2022',
    coverImage: '/b.jpg',
    photos: [{ id: 'p2', url: '/b.jpg' }],
    date: '2022-07-03',
    order: 1,
  },
  {
    id: 'w3',
    title: 'Peresean, Lombok',
    coverImage: '/c.jpg',
    photos: [{ id: 'p3', url: '/c.jpg' }],
    date: '2023',
    order: 2,
  },
  {
    id: 'w4',
    title: 'A Journey to Yogyakarta',
    coverImage: '/d.jpg',
    photos: [{ id: 'p4', url: '/d.jpg' }],
    date: '2024-05-11',
    order: 3,
  },
];

const sampleEssays: EssayArticle[] = [
  {
    id: 'e1',
    title: 'Menunggu Senja di Halaman Candi',
    publishedAt: '2022-07-12',
    body: 'Paragraf pertama tentang cahaya senja.',
    order: 0,
  },
  {
    id: 'e2',
    title: 'Catatan Pagi dari Gang-Gang Yogyakarta',
    publishedAt: '2024-05-24',
    body: 'Paragraf tentang suasana pagi.',
    order: 1,
  },
];

test('parseSortableDate handles year, year-month, and full ISO date', () => {
  assert.ok(parseSortableDate('2024-05-11') > parseSortableDate('2023'));
  assert.ok(parseSortableDate('2023') > parseSortableDate('2022-07-03'));
  assert.equal(parseSortableDate('2022'), Date.UTC(2022, 0, 1));
});

test('formatDisplayDate renders Indonesian editorial dates and plain years', () => {
  assert.equal(formatDisplayDate('2022'), '2022');
  assert.equal(formatDisplayDate('2022-07'), 'Juli 2022');
  assert.equal(formatDisplayDate('2022-07-03'), '3 Juli 2022');
});

test('filterAndSortWorks filters strictly by title and supports custom, newest, and oldest sorts', () => {
  const searched = filterAndSortWorks(sampleWorks, 'prambanan', 'custom');
  assert.deepEqual(
    searched.map((w) => w.id),
    ['w1', 'w2']
  );

  const newest = filterAndSortWorks(sampleWorks, '', 'newest');
  assert.deepEqual(
    newest.map((w) => w.id),
    ['w4', 'w3', 'w1', 'w2']
  );

  const oldest = filterAndSortWorks(sampleWorks, '', 'oldest');
  assert.deepEqual(
    oldest.map((w) => w.id),
    ['w1', 'w2', 'w3', 'w4']
  );

  const custom = filterAndSortWorks(sampleWorks, '', 'custom');
  assert.deepEqual(
    custom.map((w) => w.id),
    ['w1', 'w2', 'w3', 'w4']
  );
});

test('filterAndSortEssays filters by title and sorts chronologically or by custom order', () => {
  const searched = filterAndSortEssays(sampleEssays, 'yogyakarta', 'custom');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'e2');

  const newest = filterAndSortEssays(sampleEssays, '', 'newest');
  assert.deepEqual(
    newest.map((e) => e.id),
    ['e2', 'e1']
  );
});

test('reorderItems and moveItemToIndex update order immutably and respect boundaries', () => {
  const movedUp = reorderItems(sampleWorks, 2, 'up');
  assert.deepEqual(
    movedUp.map((w) => w.id),
    ['w1', 'w3', 'w2', 'w4']
  );
  assert.deepEqual(
    movedUp.map((w) => w.order),
    [0, 1, 2, 3]
  );

  // Original array order untouched
  assert.equal(sampleWorks[2].id, 'w3');

  // Boundary no-op
  const boundary = reorderItems(sampleWorks, 0, 'up');
  assert.deepEqual(
    boundary.map((w) => w.id),
    ['w1', 'w2', 'w3', 'w4']
  );

  const movedDirect = moveItemToIndex(sampleWorks, 3, 0);
  assert.deepEqual(
    movedDirect.map((w) => w.id),
    ['w4', 'w1', 'w2', 'w3']
  );
});

test('validateWorkInput enforces required title, date, and visual asset while keeping description optional', () => {
  const invalid = validateWorkInput({ title: '  ', date: '', coverImage: '', photosCount: 0 });
  assert.ok(invalid.title);
  assert.ok(invalid.date);
  assert.ok(invalid.coverImage);

  const validYearOnly = validateWorkInput({
    title: 'Potret Pagi',
    date: '2025',
    coverImage: '/photo.jpg',
    photosCount: 1,
  });
  assert.deepEqual(validYearOnly, {});

  const badDateFormat = validateWorkInput({
    title: 'Potret Pagi',
    date: 'kemarin',
    coverImage: '/photo.jpg',
    photosCount: 1,
  });
  assert.ok(badDateFormat.date);
});

test('validateEssayInput enforces required title, date, and body without requiring categories or images', () => {
  const invalid = validateEssayInput({ title: '', publishedAt: '', body: '   ' });
  assert.ok(invalid.title);
  assert.ok(invalid.publishedAt);
  assert.ok(invalid.body);

  const valid = validateEssayInput({
    title: 'Esai Tanpa Kategori',
    publishedAt: '2025-04-01',
    body: 'Isi tulisan yang lengkap.',
  });
  assert.deepEqual(valid, {});
});

test('estimateReadingMinutes returns at least 1 minute', () => {
  assert.equal(estimateReadingMinutes('Sebuah kalimat singkat.'), 1);
  const longText = new Array(450).fill('kata').join(' ');
  assert.equal(estimateReadingMinutes(longText), 3);
});
