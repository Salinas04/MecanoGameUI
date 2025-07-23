# TypingRush Frontend

This is the frontend for the TypingRush typing game, built with Nuxt 3, Vue 3 (Composition API), and Tailwind CSS.

## Features

- Interactive typing game with real-time feedback
- WPM (Words Per Minute) calculation
- Accuracy and error tracking
- Color-coded characters (green for correct, red for incorrect, gray for pending)
- Results modal with score submission
- Leaderboard to view top scores
- Dark mode support
- Responsive design for mobile and desktop
- Local storage for best score persistence
- Smooth animations and transitions with Vue Motion

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   API_BASE_URL=http://localhost:5000
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Project Structure

- `/components`: Vue components
- `/composables`: Reusable composition functions
- `/layouts`: Page layouts
- `/pages`: Application pages
- `/public`: Static assets
- `/assets`: CSS and other assets

## Composables

### useApi

Handles API calls to the backend:
- `getRandomPhrase()`: Fetches a random phrase
- `saveScore()`: Saves a user's score
- `getTopScores()`: Fetches the top 10 scores

### useTypingGame

Manages the typing game logic:
- Game state (phrase, user input, timing)
- WPM calculation
- Accuracy tracking
- Error counting
- Character status for display
- Local storage for best score

## Animations

The application uses Vue Motion to create smooth, engaging animations that enhance the user experience:

- **Character Animations**: Letters in the typing game animate when changing state (correct/incorrect)
- **Stats Updates**: WPM, accuracy, and error counters animate when values change
- **Modal Transitions**: Results and rules modals have spring-based entrance/exit animations
- **Dark Mode Toggle**: Smooth rotation animations when switching between light and dark modes
- **Best Score Display**: Cascading animations when displaying best score information
- **Button Interactions**: Subtle hover animations on buttons for better feedback
