import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useLayoutEffect } from 'react';

export default function EditEventScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const curEvent = useQuery(api.events.getSpecificEvents, { eventId: id as string });
    const updateEvent = useMutation(api.events.editEvent); 
    
    const navigation = useNavigation();

    useLayoutEffect(() => {
      if (curEvent) {
        navigation.setOptions({
          title: "Editing",
          headerBackTitle: curEvent.title,
        });
      }
    }, [navigation, curEvent]);

    useEffect(() => {
      const event = curEvent
      if (event) {
        setTitle(event.title);
        setDate(new Date(event.date).toISOString().split('T')[0]);
        setDescription(event.description);
        setLocation(event.location);
        setTime(event.time);
      }
    }, [id]);

  const handleSave = async () => {
    // Implement save logic here
    
    await updateEvent({ 
      title, 
      date, 
      description,
      location, 
      time, 
      eventId: id as string,
     });
     
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder={title || "Event Title"}
      />
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder={date ? new Date(curEvent.date).toISOString().split('T')[0] : "YYYY-MM-DD"}
      />
      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder={time || "Time"}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder={location || "Location"}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder={description || "Event Description"}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    color: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    color: 'white',
  },
  saveButton: {
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
