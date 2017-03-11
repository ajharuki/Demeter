/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Person } from './person.js';

if (Meteor.isServer) {
  describe('Person', () => {
    describe('methods', () => {
      const userId = Random.id();
      it('can add person', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];

        addPerson.apply(userId,["jlarobello","1234","1234"]);

        // Verify that the method does what we expected
        assert.equal(Person.find().count(), 1);

        // Remove person
        Person.remove({"username": "jlarobello"});
      }),
      it('can get person by username', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];

        addPerson.apply(userId,["jlarobello","1234","1234"])

        var person = getPerson.apply(userId, ["jlarobello"])

        // Verify that the method does what we expected
        assert.notEqual(person, null);
        assert.equal(person.username, "jlarobello");

        // Remove person
        Person.remove({"username": "jlarobello"});
      }),
      it('can add a badge to a person', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const addBadge = Meteor.server.method_handlers['person.addBadge'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];

        addPerson.apply(userId,["jlarobello","1234","1234"]);
        addBadge.apply(userId,["jlarobello","kdlsakf3234"]);
        addBadge.apply(userId,["jlarobello","skldjf23434"]);
        addBadge.apply(userId,["jlarobello","skldjf23434"]);

        var person = getPerson.apply(userId, ["jlarobello"])

        // Verify that the method does what we expected
        assert.equal(Person.find().count(), 1);
        assert.equal(person.badges.length, 2);
        assert.equal(person.badges[0], "kdlsakf3234");
        assert.equal(person.badges[1], "skldjf23434");

        // Remove person
        Person.remove({"username": "jlarobello"});
      }),
      it('can get a persons badges', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const addBadge = Meteor.server.method_handlers['person.addBadge'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];
        const getBadges = Meteor.server.method_handlers['person.getBadges'];

        addPerson.apply(userId,["jlarobello","1234","1234"]);
        addBadge.apply(userId,["jlarobello","kdlsakf3234"]);
        addBadge.apply(userId,["jlarobello","skldjf23434"]);
        addBadge.apply(userId,["jlarobello","skldjf23434"]);

        var badges = getBadges.apply(userId, ["jlarobello"])

        // Verify that the method does what we expected
        assert.equal(badges.length, 2);
        assert.equal(badges[0], "kdlsakf3234");
        assert.equal(badges[1], "skldjf23434");

        // Remove person
        Person.remove({"username": "jlarobello"});
      }),
      it('can set a persons level', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];
        const setLevel = Meteor.server.method_handlers['person.setLevel'];

        addPerson.apply(userId,["jlarobello","1234","1234"]);
        setLevel.apply(userId, ["jlarobello",2]);

        var person = getPerson.apply(userId, ["jlarobello"]);

        // Verify that the method does what we expected
        assert.notEqual(person.level, 1);
        assert.equal(person.level, 2);

        // Remove person
        Person.remove({"username": "jlarobello"})
      }),
      it('can check if a user exist', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];
        const isExist = Meteor.server.method_handlers['person.isExist'];

        addPerson.apply(userId,["jlarobello","1234","1234"]);

        // Verify that the method does what we expected
        assert.equal(isExist.apply(userId, ["jlarobello"]), true);

        // Remove person
        Person.remove({"username": "jlarobello"});
      }),
      it('can set points', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];
        const setPoints = Meteor.server.method_handlers['person.setPoints'];

        addPerson.apply(userId,["jlarobello","1234","1234"]);
        setPoints.apply(userId,["jlarobello",1000]);

        var person = getPerson.apply(userId, ["jlarobello"]);

        // Verify that the method does what we expected
        assert.notEqual(person.points, 0);
        assert.equal(person.points, 1000);

        // Remove person
        Person.remove({"username": "jlarobello"});
      }),
      it('can get points', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];
        const getPoints = Meteor.server.method_handlers['person.getPoints'];
        const setPoints = Meteor.server.method_handlers['person.setPoints'];

        addPerson.apply(userId,["jlarobello","1234","1234"]);
        setPoints.apply(userId,["jlarobello",1000]);

        var points = getPoints.apply(userId, ["jlarobello"]);

        // Verify that the method does what we expected
        assert.equal(points, 1000);
        assert.notEqual(points, 0);

        // Remove person
        Person.remove({"username": "jlarobello"});
      })
    });
  });
}
