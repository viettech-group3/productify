const Event = require("../models/Event");
const EventParticipation = require("../models/EventParticipation");
const User = require("../models/User");
const { invite } = require("../utils/invite");

// invite function
const inviteUsers = async (req, res) => {
  const { invited } = req.body;
  const eventId = req.params.id;
  if (!invited) return res.status(400).json({ error: "No invited users" });
  else {
    const invitedParticipation = invited.map(
      async (email) => await invite(email, eventId)
    );
    await Promise.all(invitedParticipation);
    res.status(201).json({ message: "Invited users" });
  }
};

//get pending invitations function chi Robin
const getPendingInvitations = async (req, res) => {};

// update invitation status function chi Jenny
const updateInvitationStatus = async (req, res) => {};

module.exports = { inviteUsers, updateInvitationStatus, getPendingInvitations };
