const Event = require("../../models/event");
const User = require("../../models/user");

const { dateToString } = require("../../helpers/date");

const transformEvent = event => {
    return {
      ...event._doc,
      _id: event.id,
      date: dateToString(event._doc.date),
      creator: user.bind(this, event._doc.creator)
    };
  };
const events = async eventIds => {
    try {
      const events = await Event.find({ _id: { $in: eventIds } });
      events.map(event => {
        return transformEvent(event);
      });
      return events;
    } catch (err) {
      throw err;
    }
  };
  
  const singleEvent = async eventId => {
    try {
      const event = await Event.findById(eventId);
      return transformEvent(event);
    } catch (error) {
      throw error;
    }
  };
  
  const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        createdEvent: events.bind(this, user.createdEvents)
      };
    } catch (err) {
      throw err;
    }
  };
  
const transformBooking = booking => {
    return {
      ...booking._doc,
      _id: booking.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: dateToString(booking._doc.createdAt),
      updatedAt: dateToString(booking._doc.updatedAt)
    };
  };

  exports.transformBooking = transformBooking;
  exports.transformEvent = transformEvent;
//   exports.user = user;
//   exports.events = events;
//   exports.singleEvent = singleEvent;