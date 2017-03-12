/**
 * Created by Terry on 3/11/17.
 */
Router.configure({
  layoutTemplate: 'main_layout'

});

Router.map(function () {

  this.route('profile_file', {
    path: '/profile.html',
    template: 'profile_file'
  });

  this.route('index_file', {
    path: '/index.html',
    template: 'index_file'
  });

  this.route('community_file', {
    path: '/community.html',
    template: 'community_file'
  });
});