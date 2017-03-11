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
        level:1,
        points:0,
        m2xkey,
        badges:[],
      })
    }
  },
  'person.getByUsername' (username) {
    check(username, String);

    if (Person.findOne({username})) {
      return Person.findOne({username});
    }

    return null;
  }
});
