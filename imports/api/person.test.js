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
        addPerson.apply(1234,["jlarobello","1234","1234"])

        // Verify that the method does what we expected
        assert.equal(Person.find().count(), 1);

        // Remove person
        Person.remove({"username": "jlarobello"})
      }),
      it('can get people by id', () => {
        
      })
    });
  });
}
