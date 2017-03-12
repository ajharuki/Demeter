import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../design/index.html';
import '../design/profile.html';

if (Meteor.isClient) {

  setInterval(function () {document.getElementById("fake-query").click();}, 1000);

  Template.index_file.events({
    'click button'(event, instance) {
      // increment the counter when button is clicked
      Meteor.call('please_work', function (err, result){
        if(err)
          console.log(err);
        var fixedResults = JSON.parse(result.content);
        fixedResults = fixedResults.streams;
        Session.set('stream', fixedResults);
      })
    },
  });

  Template.index_file.helpers({
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