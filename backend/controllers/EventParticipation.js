const Event = require('../models/Event');
const EventParticipation = require('../models/EventParticipation');
const User = require('../models/User');
const { invite } = require('../utils/invite');

// Invite function
const inviteUsers = async (req, res) => {
  const { invited } = req.body;
  const eventId = req.params.id;
  if (!invited) return res.status(400).json({ error: 'No invited users' });
  else {
    const invitedParticipation = invited.map(
      async email => await invite(email, eventId),
    );
    await Promise.all(invitedParticipation);
    res.status(201).json({ message: 'Invited users' });
  }
};

/**
 * Controller function to get all pending invitations of a user
 * Asignee: chi Robin
 * Name: getPendingInvitations
 * req: request object containing user id.
 * res: response object to return status 200.
 */

/**
 * Controller function when a user accept or decline an invitation
 * Asignee: chi Jenny
 * Name: updateInvitationStatus
 * req: request object containing user id and event id.
 * res: response object to return status 200.
 */

module.exports = { inviteUsers };
