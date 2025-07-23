/**
 * Utility functions for handling user levels and streaks in the frontend
 */

// Define experience points required for each level
export const levelThresholds = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 500 },
  { level: 5, xp: 1000 },
  { level: 6, xp: 1750 },
  { level: 7, xp: 2750 },
  { level: 8, xp: 4000 },
  { level: 9, xp: 5500 },
  { level: 10, xp: 7500 },
  { level: 11, xp: 10000 },
  { level: 12, xp: 13000 },
  { level: 13, xp: 16500 },
  { level: 14, xp: 20500 },
  { level: 15, xp: 25000 },
  { level: 16, xp: 30000 },
  { level: 17, xp: 35500 },
  { level: 18, xp: 41500 },
  { level: 19, xp: 48000 },
  { level: 20, xp: 55000 },
  { level: 21, xp: 62500 },
  { level: 22, xp: 70500 },
  { level: 23, xp: 79000 },
  { level: 24, xp: 88000 },
  { level: 25, xp: 97500 },
  { level: 26, xp: 107500 },
  { level: 27, xp: 118000 },
  { level: 28, xp: 129000 },
  { level: 29, xp: 140500 },
  { level: 30, xp: 152500 }
];

/**
 * Calculate user level based on experience points
 * @param {Number} experience - User's total experience points
 * @returns {Number} - User's level
 */
export function calculateLevel(experience) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (experience >= levelThresholds[i].xp) {
      return levelThresholds[i].level;
    }
  }
  return 1; // Default to level 1
}

/**
 * Calculate experience needed for next level
 * @param {Number} experience - User's total experience points
 * @returns {Object} - Object containing current level, next level, current XP, and XP needed for next level
 */
export function getNextLevelInfo(experience) {
  const currentLevel = calculateLevel(experience);
  
  // If at max level
  if (currentLevel === levelThresholds.length) {
    return {
      currentLevel,
      nextLevel: currentLevel,
      currentXP: experience,
      nextLevelXP: levelThresholds[currentLevel - 1].xp,
      xpNeeded: 0,
      progress: 100
    };
  }
  
  const nextLevel = currentLevel + 1;
  const nextLevelXP = levelThresholds[nextLevel - 1].xp;
  const currentLevelXP = levelThresholds[currentLevel - 1].xp;
  const xpForCurrentLevel = experience - currentLevelXP;
  const xpRequiredForNextLevel = nextLevelXP - currentLevelXP;
  const progress = Math.floor((xpForCurrentLevel / xpRequiredForNextLevel) * 100);
  
  return {
    currentLevel,
    nextLevel,
    currentXP: experience,
    nextLevelXP,
    xpNeeded: nextLevelXP - experience,
    progress
  };
}

/**
 * Check if user has played today
 * @param {Date|String} lastActiveDate - User's last active date
 * @returns {Boolean} - True if user has played today, false otherwise
 */
export function hasPlayedToday(lastActiveDate) {
  if (!lastActiveDate) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day
  
  const lastActive = new Date(lastActiveDate);
  lastActive.setHours(0, 0, 0, 0); // Set to beginning of day
  
  // Compare dates
  return today.getTime() === lastActive.getTime();
}