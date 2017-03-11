import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


if (Meteor.isClient) {
  Template.dataStream.events({
    'click button'(event, instance) {
      // increment the counter when button is clicked
      Meteor.call('please_work', function (err, result){
        if(err)
          console.log(err);
        var fixedResults = JSON.parse(result.content);
        fixedResults = fixedResults.streams;
        console.log(fixedResults);
        Session.set('stream', fixedResults);
      })
    },
  });

  Template.dataStream.helpers({
    pullHumidity: function() {
      if (Session.get('stream') !== undefined) {

        var fullArray = Session.get('stream');
        var humidityArray = fullArray[0];
        return humidityArray.value;
      }
    },
    pullTemperature: function() {
      if (Session.get('stream') !== undefined) {
        var fullArray = Session.get('stream');
        var tempArray = fullArray[1];
        return tempArray.value;
      }
    },
    pullLight: function() {
      if (Session.get('stream') !== undefined) {

        var fullArray = Session.get('stream');
        var lightArray = fullArray[2];
        return lightArray.value;
      }
    }
  });
}