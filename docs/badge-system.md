# Badge System Documentation

## Overview

The badge system allows users to unlock badges as they progress through levels in the application. Badges are unlocked every 5 levels, providing users with a sense of achievement and progression.

## Implementation Details

### Level System

- The level system has been extended from 10 levels to 30 levels
- Each level requires progressively more experience points to achieve
- Level thresholds are defined in `frontend/utils/levelUtils.js`

### Badge System

- Badges are unlocked every 5 levels (levels 5, 10, 15, 20, 25, and 30)
- Badge definitions and utility functions are in `frontend/utils/badgeUtils.js`
- Badges are displayed in the user profile page

### Available Badges

| Badge | Level | Name | Description | Icon |
|-------|-------|------|-------------|------|
| 1 | 5 | Novice Typist | Reached level 5 | 🔰 |
| 2 | 10 | Intermediate Typist | Reached level 10 | 🥉 |
| 3 | 15 | Advanced Typist | Reached level 15 | 🥈 |
| 4 | 20 | Expert Typist | Reached level 20 | 🥇 |
| 5 | 25 | Master Typist | Reached level 25 | 🏆 |
| 6 | 30 | Grandmaster Typist | Reached level 30 | 👑 |

## User Interface

The badge system is integrated into the user profile page, where users can see:

1. Their current level and progress to the next level
2. The badges they have unlocked
3. Information about the next badge they can unlock

## Technical Implementation

### Files Modified

1. `frontend/utils/levelUtils.js` - Extended level thresholds from 10 to 30 levels
2. `frontend/pages/profile.vue` - Added UI for displaying level and badges
3. `frontend/utils/badgeUtils.js` (new file) - Added badge definitions and utility functions

### Badge Calculation

Badges are calculated dynamically based on the user's experience points:

1. The user's level is calculated using the `calculateLevel` function from `levelUtils.js`
2. Badges are determined using the `getUnlockedBadges` function from `badgeUtils.js`
3. The next badge to unlock is determined using the `getNextBadge` function from `badgeUtils.js`

No changes to the backend were required, as badges are calculated on the frontend based on the user's experience points.

## Future Enhancements

Possible future enhancements to the badge system:

1. Add more badge types based on other achievements (e.g., streak milestones, accuracy thresholds)
2. Add animations when a user unlocks a new badge
3. Add a notification system to inform users when they unlock a new badge
4. Add a dedicated badges page where users can see all available badges and their requirements