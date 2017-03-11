import { Template } from 'meteor/templating';
//import '../imports/api/m2x.js';
import { Session } from 'meteor/session';
//import angular from 'angular';
//import angularMeteor from 'angular-meteor';

// angular.module('demeter', [
//   angularMeteor
// ]);
//
//


if (Meteor.isClient) {
  Template.plswork.events({
    'click button'(event, instance) {
      // increment the counter when button is clicked
      Meteor.call('please_work', function (err, result){
        if(err)
          console.log(err);
        console.log(result);
        Session.set('test', result);
      })
    },
  });

  Template.plswork.helpers({
    test_pull: function() {
      return Session.get('test');
    }
  });
}