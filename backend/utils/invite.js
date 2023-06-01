const EventParticipation = require("../models/EventParticipation");
const User = require("../models/User");

const invite = async (email, id) => {
  try {
    const invitedUser = await User.findOne({ email: email });

    // If the user does not exist, skip
    if (!invitedUser) return;

    const invitedParticipation = new EventParticipation({
      eventId: id,
      userId: invitedUser._id,
      status: "pending",
    });

    // Populate 'userId' field with only 'email' field from User document
    await EventParticipation.populate(invitedParticipation, {
      path: "userId",
      select: "email",
    });

    await invitedParticipation.save();
  } catch (error) {
    console.log(`Failed to invite ${email}: ${error}`);
  }
};

module.exports = { invite };
