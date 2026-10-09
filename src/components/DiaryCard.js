import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DiaryCard({ title, date, preview, moodUri, isLocal, moodType }) {
  // Variasi border sesuai mood
  const borderColor = moodType === 'happy' ? '#22c55e' : '#e5e7eb';

  return (
    <View style={[styles.card, { borderColor }]}>
      <Image
        source={isLocal ? moodUri : { uri: moodUri }}
        style={styles.mood}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
          {preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
  },
});