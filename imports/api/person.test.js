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

        addPerson.apply(userId,["jlarobello","1234","1234"])

        // Verify that the method does what we expected
        assert.equal(Person.find().count(), 1);

        // Remove person
        Person.remove({"username": "jlarobello"})
      }),
      it('can get person by username', () => {
        const addPerson = Meteor.server.method_handlers['person.insert'];
        const getPerson = Meteor.server.method_handlers['person.getByUsername'];

        addPerson.apply(userId,["jlarobello","1234","1234"])

        var person = getPerson.apply(userId, ["jlarobello"])

        // Verify that the method does what we expected
        assert.equal(Person.find().count(), 1);
        assert.equal(person.username, "jlarobello");

        // Remove person
        Person.remove({"username": "jlarobello"})
      }),
      it('can get a persons badges', () => {

      }),
      it('can set a persons level', () => {

      }),
      it('can check if a user exist', () => {

      })
    });
  });
}
