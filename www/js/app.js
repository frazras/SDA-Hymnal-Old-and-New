// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'ionic.service.analytics', 'starter.controllers', 'starter.services','ngCordova', 'jett.ionic.filter.bar'])

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    // Add this inside your $ionicPlatform.ready function that is defined inside the run function:
    $ionicAnalytics.register();
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.new-num', {
    url: '/new-num',
    views: {
      'tab-new-num': {
        templateUrl: 'templates/new-num.html',
        controller: 'NewNum'
      }
    }
  })
  .state('tab.new-num-detail', {
      url: '/new-num/:number/:version/:isPrevDisabled/:isNextDisabled',
      views: {
        'tab-new-num': {
          templateUrl: 'templates/new-hymns-detail.html',
          controller: 'NewHymnsDetailCtrl'
        }
      }
    })

  .state('tab.new-list', {
      url: '/new-list',
      views: {
        'tab-new-list': {
          templateUrl: 'templates/new-list.html',
          controller: 'NewList'
        }
      }
    })
    .state('tab.new-list-detail', {
      url: '/new-list/:number/:version/:isPrevDisabled/:isNextDisabled',
      views: {
        'tab-new-list': {
          templateUrl: 'templates/new-hymns-detail.html',
          controller: 'NewHymnsDetailCtrl'
        }
      }
    })
    
    /*Settings*/
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/settings.html',
          controller: 'Settings'
        }
      }
    })

/* Old Hymnal*/

.state('tab.old-num', {
  url: '/old-num',
  views: {
    'tab-old-num': {
      templateUrl: 'templates/old-num.html',
      controller: 'OldNum'
    }
  }
})
.state('tab.old-num-detail', {
    url: '/old-num/:number/:version/:isPrevDisabled/:isNextDisabled',
    views: {
      'tab-old-num': {
        templateUrl: 'templates/old-hymns-detail.html',
        controller: 'OldHymnsDetailCtrl'
      }
    }
  })

.state('tab.old-list', {
    url: '/old-list',
    views: {
      'tab-old-list': {
        templateUrl: 'templates/old-list.html',
        controller: 'OldList'
      }
    }
  })
  .state('tab.old-list-detail', {
    url: '/old-list/:number/:version/:isPrevDisabled/:isNextDisabled',
    views: {
      'tab-old-list': {
        templateUrl: 'templates/old-hymns-detail.html',
        controller: 'OldHymnsDetailCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/new-num');

});
