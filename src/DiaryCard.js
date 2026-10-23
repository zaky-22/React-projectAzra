import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

// Fungsi untuk menentukan warna border berdasarkan berbagai jenis mood (dari kodingan lamamu)
const getBorderColor = (moodType) => {
  switch (moodType) {
    case 'happy':
      return '#22c55e'; // Hijau
    case 'productive':
    case 'focus':
      return '#3b82f6'; // Biru
    case 'calm':
    case 'relax':
      return '#8b5cf6'; // Ungu
    case 'sport':
    case 'active':
      return '#f97316'; // Oranye
    case 'plan':
      return '#eab308'; // Kuning
    default:
      return '#06b6d4'; // Cyan / Biru Muda untuk mood lainnya
  }
};

export default function DiaryCard({
  title,
  date,
  preview,
  moodImage,
  moodType,
  onPress,
  variant = 'list',
  // Properti tambahan dari modul untuk fitur Like & Aksesibilitas
  liked = false,
  onToggleLike = () => {},
}) {
  // Menggunakan fungsi getBorderColor agar warna border kartu dinamis
  const borderColor = getBorderColor(moodType);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      accessible
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
    >
      <View style={[
        styles.card,
        { borderColor },
        variant === 'grid' && styles.cardGrid
      ]}>
        <Image source={moodImage} style={styles.mood} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>
        
        {/* Tombol Like dari modul */}
        <Pressable
          onPress={onToggleLike}
          hitSlop={8}
          accessibilityLabel={liked ? 'Batal suka' : 'Suka'}
        >
          <Text style={styles.like}>{liked ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 2, // Menggunakan ketebalan border 2 dari kodingan lamamu agar warnanya lebih jelas
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  cardGrid: {
    // Styling tambahan jika diperlukan untuk mode grid
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: '#eef2ff',
  },
  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 6 },
  preview: { fontSize: TYPO.body, color: COLORS.text },
  like: { fontSize: 22, paddingHorizontal: 6 },
});