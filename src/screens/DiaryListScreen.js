import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import DiaryCard from '../components/DiaryCard';

// Import gambar lokal dari folder assets/moods/
import happyIcon from '../../assets/moods/happy.png';

const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    moodUri: happyIcon, // Menggunakan gambar lokal
    isLocal: true,
    moodType: 'happy',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    moodUri: 'https://picsum.photos/seed/focus/80',
    isLocal: false,
    moodType: 'normal',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    moodUri: 'https://picsum.photos/seed/calm/80',
    isLocal: false,
    moodType: 'normal',
  },
  {
    id: 4,
    title: 'Olahraga Sore',
    date: '2025-10-03',
    preview: 'Berhasil jogging 5km tanpa berhenti. Badan terasa jauh lebih segar!',
    moodUri: 'https://picsum.photos/seed/sport/80',
    isLocal: false,
    moodType: 'normal',
  },
  {
    id: 5,
    title: 'Evaluasi Mingguan',
    date: '2025-10-02',
    preview: 'Menyusun target untuk minggu depan agar semua tugas praktikum selesai tepat waktu.',
    moodUri: 'https://picsum.photos/seed/plan/80',
    isLocal: false,
    moodType: 'normal',
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header dengan Avatar Pengguna */}
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

      {/* Daftar Kartu Diary */}
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodUri={entry.moodUri}
          isLocal={entry.isLocal}
          moodType={entry.moodType}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
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
    fontSize: 22,
    fontWeight: '700',
  },
});