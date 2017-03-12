import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/**
 * API for badge queries.
 */
export const Badges = new Mongo.Collection('badges');

Meteor.methods({
  'badges.insert' (name, desc, image_url) {
    check(name, String);
    check(desc, String);
    check(image_url, String);

    if (!Badges.findOne({name})) {
      Badges.insert({
        name,
        desc,
        image_url
      })
    }
  },
  'badges.getBadge' (name) {
    check(name, String);

    if (Badges.findOne({name})) {
      return Badges.findOne({name});
    }
    return null;
  }
});
