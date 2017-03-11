
/*
 * m2x api calls
 */

export const Tasks = new Mongo.Collection('m2x');

if (Meteor.isServer) {
  Meteor.methods({
    'please_work'() {
      var retval = -1;
      var apiUrl = "http://api-m2x.att.com/v2/devices/153fe019985aedf824085674c156a7bc";
      var response = HTTP.get(apiUrl, {headers: {"X-M2X-KEY" : "f76e681663265e4c8de18b874f6dcc21"}});

      return response;

      console.log("done");

    }
  });

}


