let allAvatars = require('../constants/avatars');
allAvatars = allAvatars.allAvatars;

const getAllAvatars = (totalpoints, purchasedAvatars) => {
  console.log('totalpoints', totalpoints);
  const userlevel = Math.floor(totalpoints / 100); // current level of user

  return allAvatars.map(({ level, avatars }) => {
    // if the current level is under user Level, then user will be able to access the avatar
    if (level <= userlevel) {
      return {
        level: level,
        avatars: avatars.map((currentAvatar, index) => {
          // if user already purchased the avatar, then set unlocked to true
          // otherwise, set unlocked to false
          if (purchasedAvatars[level].includes(currentAvatar.identifier)) {
            return {
              type: currentAvatar.type,
              identifier: currentAvatar.identifier,
              name: currentAvatar.name,
              unlocked: true,
            };
          } else {
            return {
              type: currentAvatar.type,
              identifier: currentAvatar.identifier,
              name: currentAvatar.name,
              unlocked: false,
            };
          }
        }),
      };
    } else {
      // the current level is greater than userLevel so user can't access to avatars in here
      return {
        level: level,
        avatars: avatars.map((currentAvatar, index) => {
          return {
            type: currentAvatar.type,
            identifier: currentAvatar.identifier,
            name: currentAvatar.name,
            unlocked: false,
          };
        }),
      };
    }
  });
};

module.exports = { getAllAvatars };
