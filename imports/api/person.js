import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/**
 * API for adding and accessing person from database.
 */
export const Person = new Mongo.Collection('person');

if (Meteor.isServer) {
  // This code only runs on the server. I think I need this.
  Meteor.publish('person', function personPublication() {
    return Person.find({

    });
  });
}

Meteor.methods({
  'person.insert' (username, pass, m2xkey) {
    check(username, String);
    check(pass, String);

    if (!Person.findOne({username})) {
      Person.insert({
        username,
        pass,
        level:Number(1),
        points:Number(0),
        m2xkey,
        badges:[],
      })
    }
  },
  'person.getByUsername' (username) {
    check(username, String);

    var person = Person.findOne({username});

    if (person) {
      return person;
    }

    return null;
  },
  'person.addBadge' (username, badgeId) {
    check(username, String);
    check(badgeId, String);

    var person = Person.findOne({username});

    if (person) {
      if (!badgeExist(person.badges, badgeId)){
        Person.update({username}, { $push: { badges: badgeId}});
      }
    }
  },
  'person.getBadges' (username) {
    check(username, String);

    var person = Person.findOne({username});

    if (person) {
      return person.badges;
    }

    return null;
  },
  'person.setLevel' (username, newLevel) {
    check(username, String);
    check(newLevel, Number);

    if (Person.findOne({username})) {
      Person.update({username}, {'$set': {level: Number(newLevel)}});
    }
  },
  'person.isExist' (username) {
    if (Person.findOne({username}))
      return true;
    return false;
  },
  'person.setPoints' (username, newPoints) {
    check(username, String);
    check(newPoints, Number);

    if (Person.findOne({username})) {
      Person.update({username}, {'$set': {points: Number(newPoints)}});
    }
  },
  'person.getPoints' (username) {
    check(username, String);

    var person = Person.findOne({username});

    if (person)
      return person.points;
    return -1;
  }
})

function badgeExist(arr, badgeId) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == badgeId) {
      return true;
    }
  }
  return false;
};
