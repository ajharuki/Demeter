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


        var d = document.getElementById("humidity")

        if (humidityArray.value <= 40) {
          d.style.borderColor = '#C0392B';
        } else if (humidityArray.value > 40 && humidityArray.value < 50) {
          d.style.borderColor = '#F1C40F';
        } else {
          d.style.borderColor = '#2ECC71';
        }

        return humidityArray.value;
      }
    },
    pullTemperature: function() {
      if (Session.get('stream') !== undefined) {
        var fullArray = Session.get('stream');
        var tempArray = fullArray[1];

        var d = document.getElementById("temp")

        if (tempArray.value <= 30) {
          d.style.borderColor = '#2ECC71';
        } else if (tempArray.value > 30 && tempArray.value < 40) {
          d.style.borderColor= '#F1C40F';
        } else {
          d.style.borderColor = '#C0392B';
        }

        return tempArray.value;
      }
    },
    pullLight: function() {
      if (Session.get('stream') !== undefined) {

        var fullArray = Session.get('stream');
        var lightArray = fullArray[2];

        var d = document.getElementById("light")

        if (lightArray.value <= 70) {
          d.style.borderColor = '#2ECC71';
        } else if (lightArray.value > 70 && lightArray.value < 80) {
          d.style.borderColor= '#F1C40F';
        } else {
          d.style.borderColor = '#C0392B';
        }

        return lightArray.value;
      }
    }
  });
}