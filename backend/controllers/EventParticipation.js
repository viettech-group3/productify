const Event = require('../models/Event');
const EventParticipation = require('../models/EventParticipation');
const User = require('../models/User');
const { invite } = require('../utils/invite');

// Invite user emails function
const invitedUserEmails = async (req, res) => {
  const invitor = req.user._id;
  const { invited } = req.body;
  const eventId = req.params.id;
  if (!invited) return res.status(400).json({ error: 'No invited users' });
  else {
    const invitedParticipation = invited.map(
      async email => await invite(email, eventId, invitor),
    );
    await Promise.all(invitedParticipation);
    res.status(201).json({ message: 'Invited users' });
  }
};

/**
 * Controller function to get all pending invitations of a user
 * Asignee: Jenny
 * Name: getPendingInvitations
 * req: request object containing user id.
 * res: response object to return status 200.
 */
const getPendingInvitations = async (req, res) => {
  try {
    // need to change schema to get the person who send the invitation
    const userId = req.user._id;
    const participation = await EventParticipation.find({
      userId: userId,
      status: 'pending',
    });

    const result = await Promise.all(
      participation.map(async participation => {
        const invitor = await User.findById(participation.invitedBy);
        let tempEvent = await Event.findById(participation.eventId).lean();
        //tempEvent = JSON.parse(JSON.stringify(tempEvent));
        const modifiedResult = { ...tempEvent, invitedBy: invitor.email };
        return modifiedResult;
      }),
    );

    res.status(201).json({ invitedEvents: result });
  } catch (error) {
    console.log('Failed to fetch pending Inviattions of a user');
    res.status(500).json({ error: error });
  }
};

/**
 * Controller function when a user accept or decline an invitation
 * Asignee: chi Jenny
 * Name: updateInvitationStatus
 * req: request object containing user id and event id.
 * res: response object to return status 200.
 */
const updateInvitationStatus = async (req, res) => {
  const userId = req.user._id;
  const { decision } = req.body;
  const eventId = req.params.id;
  const event = await Event.findById(eventId);

  // wont do anything if decision if not valid or event is already done
  if (decision != 'accepted' && decision != 'denied') {
    res.status(400).json({ message: 'Invalidn decision choice' });
  } else if (event.status != 'ongoing') {
    res.status(400).json({ message: 'Event is already done' });
  } else {
    // update the status only when boh eventId and userId match
    const eventParticipation = await EventParticipation.findOneAndUpdate(
      {
        eventId: eventId,
        userId: userId,
      },
      {
        status: decision,
      },
      {
        new: true,
      },
    );
    res.status(200).json(event);
  }
};

module.exports = {
  invitedUserEmails,
  updateInvitationStatus,
  getPendingInvitations,
};
