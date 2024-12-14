import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo'

export default function EventsScreen() {
  const router = useRouter();
  const { user }= useUser();
  const allEvents = useQuery(api.events.getEvents);
  const events = allEvents?.filter(event => event.guests.includes(user?.id as string));
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.eventId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/events/${item.eventId}`)} style={styles.eventItem}>
            <View>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text>
                {item.userId} - {item.location} - {item.time}
              </Text>
              <Text>
                {item.date ? new Date(item.date).toLocaleDateString() : 'Date not available'}
              </Text>
              <Text>
                {item.guests.length} guests
              </Text>
              <Text>
                {item.description || 'Description not available'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  eventItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

