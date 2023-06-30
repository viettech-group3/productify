import { allAvatars } from '../constants/avatar';
// Dei was here :))
const getAllAvatars = user => {
  const { points, purchasedAvatars } = user;
  const level = int(points / 100); // find a function to only get the integer part
  allAvatars.map(({ level, avatars }) => {
    // If user level is 0, they can only access
    // avatars at level 0, and anything above is locked
    if (userLevel < level) {
      // handle avatars at level above user
      return avatars.map((a, index) => {
        return {
          type: a.type,
          identifier: a.identifier,
          unlocked: false,
        };
      });
    } else {
      return avatars.map((a, index) => {
        return {
          ...a, // type: a.type, identifier: a.identifier
          unlocked: index in purchasedAvatars[level], // could be different depending on user
        };
      });
    }
  });
};
