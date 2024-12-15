import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from '@clerk/clerk-expo'
import { useState } from 'react';
import { useLayoutEffect } from 'react';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user }= useUser();
  const [hasJoined, setHasJoined] = useState(false);
  const navigation = useNavigation();

  const event = useQuery(api.events.getSpecificEvents, { eventId: id as string });
  const joinEvent = useMutation(api.events.joinEvent);

  useLayoutEffect(() => {
    if (event) {
      navigation.setOptions({
        title: event.title,
        headerBackTitle: 'Events',
      });
    }
  }, [navigation, event]);

  if (!event) {
    return <Text>Event not found</Text>;
  }


  const handleJoin = async () => {
    // Implement join logic here
    setHasJoined(event?.guests.includes(user?.id as string))

    if (!hasJoined) {
      await joinEvent({ eventId: id as string, userId: user?.id as string });
      setHasJoined(true);
    }

  };

  const handleEdit = () => {
    router.push(`/events/edit/${event.eventId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>
        Date: {new Date(event.date).toLocaleDateString()}
        </Text>
      <Text style={styles.date}>
        Time: {event.time}
      </Text>
      <Text style={styles.text}>
        Location: {event.location}
      </Text>
      <Text style={styles.text}>
        {event.guests.length} guests
      </Text>
      <Text style={styles.description}>
        Description: {'\n'}
        {event.description}
        </Text>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={handleJoin}
        disabled={hasJoined}
      >
        <Text style={styles.buttonText}>
          {hasJoined ? "Joined" : "Join Event"}
        </Text>
      </TouchableOpacity>
      {event.createdBy === user?.id && (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={[styles.buttonText, { color: 'black' }]}>Edit Event</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  date: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    color: 'white',
  },
  joinButton: {
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: 'darkgray',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

