/**
 * Utility functions for handling user badges in the frontend
 */

import { calculateLevel } from './levelUtils';

// Define badges that can be unlocked
export const badges = [
  {
    id: 'novice',
    name: 'Novice Typist',
    description: 'Reached level 5',
    level: 5,
    icon: '🔰'
  },
  {
    id: 'intermediate',
    name: 'Intermediate Typist',
    description: 'Reached level 10',
    level: 10,
    icon: '🥉'
  },
  {
    id: 'advanced',
    name: 'Advanced Typist',
    description: 'Reached level 15',
    level: 15,
    icon: '🥈'
  },
  {
    id: 'expert',
    name: 'Expert Typist',
    description: 'Reached level 20',
    level: 20,
    icon: '🥇'
  },
  {
    id: 'master',
    name: 'Master Typist',
    description: 'Reached level 25',
    level: 25,
    icon: '🏆'
  },
  {
    id: 'grandmaster',
    name: 'Grandmaster Typist',
    description: 'Reached level 30',
    level: 30,
    icon: '👑'
  }
];

/**
 * Get all badges that a user has unlocked based on their level
 * @param {Number} experience - User's total experience points
 * @returns {Array} - Array of unlocked badge objects
 */
export function getUnlockedBadges(experience) {
  const userLevel = calculateLevel(experience);
  return badges.filter(badge => userLevel >= badge.level);
}

/**
 * Check if a user has unlocked a specific badge
 * @param {Number} experience - User's total experience points
 * @param {String} badgeId - ID of the badge to check
 * @returns {Boolean} - True if the badge is unlocked, false otherwise
 */
export function hasBadge(experience, badgeId) {
  const userLevel = calculateLevel(experience);
  const badge = badges.find(b => b.id === badgeId);
  return badge ? userLevel >= badge.level : false;
}

/**
 * Get the next badge that a user can unlock
 * @param {Number} experience - User's total experience points
 * @returns {Object|null} - Next badge object or null if all badges are unlocked
 */
export function getNextBadge(experience) {
  const userLevel = calculateLevel(experience);
  const nextBadge = badges.find(badge => userLevel < badge.level);
  return nextBadge || null;
}