import { ref, computed, watch } from 'vue';

export function useTypingGame() {
  // Game state
  const phrase = ref('');
  const userInput = ref('');
  const isGameActive = ref(false);
  const isGameComplete = ref(false);
  const startTime = ref(null);
  const endTime = ref(null);
  const errors = ref(0);
  const bestScore = ref(null);
  const completedPhrases = ref(0);
  const totalCharactersTyped = ref(0);
  const totalErrors = ref(0);
  const timeRemaining = ref(120); // 2 minutes in seconds
  const timerInterval = ref(null);
  
  // Callback for phrase completion
  const onPhraseCompleted = ref(null);

  // Load best score from localStorage
  if (process.client) {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      bestScore.value = JSON.parse(savedBestScore);
    }
  }

  // Set the current phrase
  function setPhrase(newPhrase) {
    phrase.value = newPhrase;
    userInput.value = '';
  }

  // Reset the game state
  function resetGame() {
    userInput.value = '';
    isGameActive.value = false;
    isGameComplete.value = false;
    startTime.value = null;
    endTime.value = null;
    errors.value = 0;
    completedPhrases.value = 0;
    totalCharactersTyped.value = 0;
    totalErrors.value = 0;
    timeRemaining.value = 120; // Reset to 2 minutes

    // Clear any existing timer
    if (timerInterval.value) {
      clearInterval(timerInterval.value);
      timerInterval.value = null;
    }
  }

  // Start the game timer
  function startTimer() {
    if (!isGameActive.value && !isGameComplete.value) {
      startTime.value = new Date();
      isGameActive.value = true;

      // Start the countdown timer
      timerInterval.value = setInterval(() => {
        if (timeRemaining.value > 0) {
          timeRemaining.value--;
        } else {
          endGame();
        }
      }, 1000);
    }
  }

  // End the game
  function endGame() {
    if (isGameActive.value) {
      endTime.value = new Date();
      isGameActive.value = false;
      isGameComplete.value = true;

      // Clear the timer
      if (timerInterval.value) {
        clearInterval(timerInterval.value);
        timerInterval.value = null;
      }

      // Save best score if current score is better
      if (process.client && wpm.value > 0) {
        const currentScore = {
          wpm: wpm.value,
          accuracy: accuracy.value,
          errors: totalErrors.value,
          completedPhrases: completedPhrases.value,
          date: new Date().toISOString()
        };

        // Calculate a score based on WPM and accuracy
        const calculatedScore = wpm.value * (accuracy.value / 100);

        if (!bestScore.value || calculatedScore > (bestScore.value.wpm * (bestScore.value.accuracy / 100))) {
          bestScore.value = currentScore;
          localStorage.setItem('bestScore', JSON.stringify(currentScore));
        }
      }
    }
  }

  // Complete the current phrase and move to the next one
  function completePhrase() {
    // Update stats for the completed phrase
    completedPhrases.value++;
    totalCharactersTyped.value += phrase.value.length;
    totalErrors.value += errors.value;

    // Reset for the next phrase
    errors.value = 0;
    userInput.value = '';

    // Call the onPhraseCompleted callback if it exists
    if (onPhraseCompleted.value && typeof onPhraseCompleted.value === 'function') {
      onPhraseCompleted.value();
    }
  }

  // Calculate words per minute
  const wpm = computed(() => {
    if (!startTime.value || (!endTime.value && !isGameActive.value)) {
      return 0;
    }

    const timeElapsed = endTime.value 
      ? (endTime.value - startTime.value) / 1000 / 60 // minutes
      : (new Date() - startTime.value) / 1000 / 60; // minutes

    // Standard: 5 characters = 1 word
    const wordCount = totalCharactersTyped.value / 5;

    return Math.round(wordCount / timeElapsed);
  });

  // Calculate accuracy percentage
  const accuracy = computed(() => {
    if (totalCharactersTyped.value === 0) {
      return 100;
    }

    const correctChars = totalCharactersTyped.value - totalErrors.value;
    return Math.round((correctChars / totalCharactersTyped.value) * 100);
  });

  // Format time remaining as MM:SS
  const formattedTimeRemaining = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  // Get character status for display
  const charStatus = computed(() => {
    return phrase.value.split('').map((char, index) => {
      if (index >= userInput.value.length) {
        return 'pending'; // Not typed yet
      } else if (char === userInput.value[index]) {
        return 'correct'; // Correctly typed
      } else {
        return 'incorrect'; // Incorrectly typed
      }
    });
  });

  // Watch user input to track game progress
  watch(userInput, (newValue, oldValue) => {
    // Start timer on first character
    if (newValue.length === 1 && oldValue.length === 0 && !isGameActive.value) {
      startTimer();
    }

    // Count errors
    if (newValue.length > oldValue.length) {
      const lastCharIndex = newValue.length - 1;
      if (lastCharIndex < phrase.value.length && 
          newValue[lastCharIndex] !== phrase.value[lastCharIndex]) {
        errors.value++;
      }
    }

    // Complete phrase when it's finished
    if (newValue.length === phrase.value.length) {
      completePhrase();
    }
  });

  return {
    phrase,
    userInput,
    isGameActive,
    isGameComplete,
    errors,
    wpm,
    accuracy,
    charStatus,
    bestScore,
    completedPhrases,
    totalErrors,
    timeRemaining,
    formattedTimeRemaining,
    setPhrase,
    resetGame,
    startTimer,
    endGame,
    completePhrase,
    onPhraseCompleted
  };
}
