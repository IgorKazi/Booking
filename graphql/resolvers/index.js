const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvent: events.bind(this, user._doc.createEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
      try {
    const events = await Event.find();
    return events
      .map(event => {
        console.log(event);
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
      })
    } catch (err) {
        console.log(err);
        throw err;
      };
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      descriptions: args.eventInput.descriptions,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5de9cf41ca8aae0e4ce5503e"
    });
    let createdEvent;
    try {
    const result = await event
      .save()
        createdEvent = {
          ...result._doc,
          _id: result._doc._id.toString(),
          creator: user.bind(this, result.creator)
        };
        const creator = await User.findById("5de9cf41ca8aae0e4ce5503e");
        if (!creator) {
          throw new Error("User not found.");
        }
        creator.createEvents.push(event);
        await creator.save();
        return createdEvent;
    } catch (error) {
        console.log(error);
        throw error;
      };
  },
  createUser: async args => {
    try {
    const existUser = await User.findOne({ email: args.userInput.email })
        if (existUser) {
          throw new Error("User exists already.");
        }
       const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        const result = await user.save();
        return { ...result._doc, password: null, _id: result.id };
          } catch (err) {
        throw err;
      };
  }
};
