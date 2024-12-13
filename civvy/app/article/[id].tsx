import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
// import { articles } from '@/constants/mockData';
import { Quiz } from '@/constants/Types';
import { useLayoutEffect } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from '@clerk/clerk-expo'

const ArticleScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const getMaterial = useQuery(api.materials.getMaterialData, { materialId: id as string });
  const article = getMaterial;

  useLayoutEffect(() => {
    if (article) {
      navigation.setOptions({
        title: article.title,
      });
    }
  }, [navigation, article]);

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Article not found</Text>
        <Text>{article}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content}</Text>
      <QuizComponent quiz={article.quiz} />
    </ScrollView>
  );
};

const QuizComponent: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const updateUserExp = useMutation(api.users.updateUserExp)
  const { user }= useUser();

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = async() => {
    setShowResult(true);

    if (selectedAnswer === quiz.correctAnswer && user?.id) {
      await updateUserExp({ userId: user.id, exp: 100 });
    }
  };

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.quizTitle}>Quiz</Text>
      <Text style={styles.quizQuestion}>{quiz.question}</Text>
      {quiz.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.quizOption,
            selectedAnswer === index && styles.selectedOption,
            showResult && index === quiz.correctAnswer && styles.correctOption,
            showResult && selectedAnswer === index && selectedAnswer !== quiz.correctAnswer && styles.incorrectOption,
          ]}
          onPress={() => handleAnswer(index)}
          disabled={showResult}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
      {!showResult && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
      {showResult && (
        <Text style={styles.resultText}>
          {selectedAnswer === quiz.correctAnswer ? 'Correct!' : 'Incorrect. Try again!'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  quizContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quizQuestion: {
    fontSize: 18,
    marginBottom: 16,
  },
  quizOption: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  correctOption: {
    backgroundColor: '#a3f7b5',
  },
  incorrectOption: {
    backgroundColor: '#ffa3a3',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default ArticleScreen;

