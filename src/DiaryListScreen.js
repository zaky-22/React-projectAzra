import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, useWindowDimensions } from 'react-native';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

// Import gambar lokal dari folder assets/moods/
import happyIcon from '../../assets/moods/happy.png';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-18',
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit. Udara terasa sejuk...',
    moodImage: happyIcon,
    moodType: 'happy',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-17',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai bersama rekan.',
    moodImage: require('../../assets/moods/focus.png'),
    moodType: 'focus',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-16',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body: 'Sore ini saya menikmati waktu di taman sambil membaca buku favorit.',
    moodImage: require('../../assets/moods/calm.png'),
    moodType: 'calm',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= (BREAKPOINTS?.tablet || 600);

  // STATE UTAMA
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);

  // DERIVED STATE (Pencarian otomatis berdasarkan judul, preview, atau tanggal)
  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.preview.toLowerCase().includes(q) ||
      entry.date.toLowerCase().includes(q)
    );
  }, [entries, query]);

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodImage={item.moodImage}
        moodType={item.moodType}
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLike(item.id)}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={keyForCols}
        data={filtered}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: 12 } : undefined}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            {/* Header Selamat Datang */}
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://picsum.photos/seed/useravatar/100' }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.welcomeText}>Selamat Datang,</Text>
                <Text style={styles.header}>Buku Harian</Text>
              </View>
            </View>

            {/* Komponen SearchBar & Form Tambah Entri */}
            <SearchBar onChange={setQuery} />
            <EntryForm onSubmit={addEntry} />
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri catatan.</Text>
        }
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface || '#ffffff',
  },
  content: {
    padding: SPACE.l || 16,
    gap: SPACE.m || 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: SPACE.l || 16,
    paddingTop: SPACE.l || 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  welcomeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  header: {
    fontSize: TYPO.h1 || 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  itemWrap: {
    flex: 1,
    marginBottom: 12,
  },
  itemWrap2: {
    flex: 1 / 2,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted || '#6b7280',
    marginTop: 40,
  },
});