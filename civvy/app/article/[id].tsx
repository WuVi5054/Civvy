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
  const getMaterial = useQuery(api.materials.getMaterialData, { materialId: id as string });
  const article = getMaterial;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (article) {
      navigation.setOptions({
        title: article.title,
        headerBackTitle: 'Learning',
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
      <QuizComponent id={id as string} quiz={article.quiz} />
    </ScrollView>
  );
};

const QuizComponent: React.FC<{ id: string, quiz: Quiz[] }> = ({ id, quiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const updateUserExp = useMutation(api.users.updateUserExp)
  const { user }= useUser();
  const markMaterialCompleted = useMutation(api.users.updateMaterialComplete);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    setShowResult(true);
    const correctAnswers = quiz.filter((question, index) => selectedAnswers[index] === question.correctAnswer);
    const exp = Math.floor((correctAnswers.length / quiz.length) * 100);
    setScore(exp);

    if (exp > 0 && user?.id) {
      await updateUserExp({ userId: user.id, exp: exp });
    }
  };

  const handleMarkCompleted = async () => {
    if (user?.id) {
      await markMaterialCompleted({ userId: user.id, materialId: id }); // assume quiz[0].id is the material ID
      setIsCompleted(true);
    }
  };

  return (
    <View style={styles.quizContainer}>
      {quiz.map((question, index) => (
        <View key={index} style={styles.quizContainer}>
          <Text style={styles.quizQuestion}>{question.question}</Text>
          {question.options.map((option, answerIndex) => (
            <TouchableOpacity
            key={answerIndex}
            style={[
              styles.quizOption,
              selectedAnswers[index] === answerIndex && styles.selectedOption,
              showResult && answerIndex === question.correctAnswer && styles.correctOption,
              showResult && selectedAnswers[index] === answerIndex && selectedAnswers[index] !== question.correctAnswer && styles.incorrectOption,
            ]}
              onPress={() => handleAnswer(index, answerIndex)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {!showResult && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
      {showResult && (
        <View>
          <Text style={styles.resultText}>You scored {score}%</Text>
          <Text style={[styles.resultText, {color: 'green'}]}>{score} Learning Points Gained!</Text>
        </View>
      )}
      {showResult && !isCompleted && (
        <TouchableOpacity style={styles.submitButton} onPress={handleMarkCompleted}>
          <Text style={styles.submitButtonText}>Mark as Completed</Text>
        </TouchableOpacity>
      )}
      {isCompleted && (
        <Text style={[styles.title, {color: 'green'}]}> Completed!</Text>
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
    alignSelf: 'center',
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
    backgroundColor: 'black',
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

