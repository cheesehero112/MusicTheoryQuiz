import React, { useState } from 'react';
import { questions } from '../data/questions';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AlertWindow from './AlertWindow'; // Import the AlertWindow component

const Quiz: React.FC = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedOption, setSelectedOption] = useState('');
	const [score, setScore] = useState(0);
	const [showAnswerStatus, setShowAnswerStatus] = useState(false);
	const [answerStatus, setAnswerStatus] = useState(false); // true if correct, false if incorrect
	const [showResult, setShowResult] = useState(false);
	const [showModal, setShowModal] = useState(false); // State for controlling the visibility of the modal
	const [modalMessage, setModalMessage] = useState(''); // State for storing the message to display in the modal

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
		setShowAnswerStatus(false);
	};

	const handleNextQuestion = () => {
		const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
		setScore(score + (isCorrect ? 1 : 0));
		setAnswerStatus(isCorrect);
		setShowModal(true);
		setShowAnswerStatus(true);

		if (currentQuestion + 1 < questions.length) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			setShowResult(true);
		}
	};

	const handleRestart = () => {
		setCurrentQuestion(0);
		setScore(0);
		setShowResult(false);
		setShowModal(false);
	};

	return (
		<View style={styles.container}>
			{showResult ? (
				<View>
					<Text style={styles.resultText}>Quiz Completed!</Text>
					<Text style={styles.resultText}>
						Your score is {score} out of {questions.length}
					</Text>
					<Button
						title='Restart Quiz'
						onPress={handleRestart}
					/>
				</View>
			) : (
				<View>
					<Text style={styles.questionText}>Current Score {score}</Text>
					<Text style={styles.questionText}>Question {currentQuestion + 1}</Text>
					<Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
					<View>
						{questions[currentQuestion].options.map((option, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => handleOptionSelect(option)}
								style={[styles.optionButton, selectedOption === option && styles.selectedOptionButton]}
							>
								<Text style={styles.optionText}>{option}</Text>
							</TouchableOpacity>
						))}
					</View>
					{/* {showAnswerStatus && (
						<Text style={[styles.answerStatus, answerStatus ? styles.correct : styles.incorrect]}>{answerStatus ? 'Correct!' : 'Incorrect!'}</Text>
					)} */}
					<Button
						title='Submit'
						onPress={handleNextQuestion}
					/>
					{/* Render the modal */}
					<AlertWindow
						visible={showModal}
						message={answerStatus ? 'Correct!' : 'Incorrect!'}
						closeModal={() => setShowModal(false)}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	resultText: {
		fontSize: 20,
		marginBottom: 10,
		textAlign: 'center',
	},
	questionText: {
		fontSize: 18,
		marginBottom: 10,
		textAlign: 'center',
	},
	optionButton: {
		backgroundColor: '#f0f0f0',
		padding: 10,
		marginVertical: 5,
		borderRadius: 5,
	},
	selectedOptionButton: {
		backgroundColor: '#d3d3d3',
	},
	optionText: {
		fontSize: 16,
		textAlign: 'center',
	},
	answerStatus: {
		fontSize: 16,
		textAlign: 'center',
		marginTop: 10,
	},
	correct: {
		color: 'green',
	},
	incorrect: {
		color: 'red',
	},
});

export default Quiz;
