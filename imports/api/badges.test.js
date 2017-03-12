import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Badges } from './badges.js';

if (Meteor.isServer) {
  describe('Badges', () => {
    describe('methods', () => {
      const badgeId = Random.id();
      it('can add badge', () => {
        const addBadge = Meteor.server.method_handlers['badges.insert'];

        addBadge.apply(badgeId,["badge1","lorem ipsum","/some/path"]);

        // Verify that the method does what we expected
        assert.equal(Badges.find().count(), 1);

        // Remove person
        Badges.remove({"name": "badge1"});
      }),
      it('can get badge', () => {
        const addBadge = Meteor.server.method_handlers['badges.insert'];
        const getBadge = Meteor.server.method_handlers['badges.getBadge'];

        addBadge.apply(badgeId,["badge1","lorem ipsum","/some/path"]);

        var badge = getBadge.apply(badgeId,["badge1"]);

        // Verify that the method does what we expected
        assert.notEqual(badge, null);

        // Remove person
        Badges.remove({"name": "badge1"});
      })
    });
  });
}
