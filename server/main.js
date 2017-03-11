import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../imports/api/m2x.js';

Meteor.startup(() => {
  // code to run on server at startup
  var apiUrl = "http://api-m2x.att.com/v2/devices/153fe019985aedf824085674c156a7bc";
  var response = HTTP.get(apiUrl, {headers: {"X-M2X-KEY" : "f76e681663265e4c8de18b874f6dcc21"}}, function(err, response) {
    console.log("DID STUFF");
    console.log(response);

  });
  console.log("done");
});


