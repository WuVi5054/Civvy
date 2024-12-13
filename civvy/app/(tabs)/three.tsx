import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { modules } from '@/constants/mockData';
import { Module } from '@/constants/Types';
import { useRouter } from 'expo-router';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const MainScreen = () => {
  const router = useRouter();
  const modules = useQuery(api.modules.get);

  const renderModule = ({ item }: { item: Module }) => (
    <TouchableOpacity
      style={styles.moduleItem}
      onPress={() => router.push(`/article/${item.id}`)}
    >
      <Text style={styles.moduleTitle}>{item.title}</Text>
      <Text style={styles.moduleTopic}>{item.topic}</Text>
    </TouchableOpacity>
  );

  const renderSection = ({ item }: { item: string }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item}</Text>
      <FlatList
        data={modules?.filter(module => module.topic === item)}
        renderItem={renderModule}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  const topics = Array.from(new Set(modules?.map(module => module.topic)));

  return (
    <FlatList
      style={styles.container}
      data={topics}
      renderItem={renderSection}
      keyExtractor={(item) => item}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,}
  ,
  section: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moduleItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleTopic: {
    fontSize: 14,
    color: '#666',
  },
});

export default MainScreen;

