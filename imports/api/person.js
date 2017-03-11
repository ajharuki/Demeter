import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/**
 * Person access
 */
export const Person = new Mongo.Collection('person');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('person', function personPublication() {
    return Person.find({

    });
  });
}

Meteor.methods({
  'person.insert' (username, pass, m2xkey) {
    check(username, String);
    check(pass, String);

    Person.insert({
      username,
      pass,
      level:1,
      points:0,
      m2xkey,
      badges:[],
    })
  }
});
